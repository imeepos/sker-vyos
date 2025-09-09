# VyOS Docker 部署文档

## 概述

VyOS 是一个开源的网络操作系统，基于 Debian Linux 构建，提供路由、防火墙、VPN 等网络功能。本文档介绍如何使用 Docker 容器化部署 VyOS，适用于测试环境和轻量级网络应用场景。

## 系统要求

### 硬件要求
- CPU: x86_64 架构，支持虚拟化
- 内存: 最少 512MB，推荐 1GB 以上
- 磁盘: 最少 2GB 可用空间

### 软件要求
- 操作系统: Linux（Ubuntu 20.04+、Debian 11+、CentOS 8+ 等）
- Docker: 版本 20.10 或更高
- 具备 sudo 或 root 权限

## 前置准备

### 1. 安装 Docker

#### Ubuntu/Debian
```bash
# 更新软件包列表
sudo apt update

# 安装必要工具
sudo apt install -y curl gnupg lsb-release

# 添加 Docker 官方 GPG 密钥
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# 添加 Docker 仓库
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# 安装 Docker
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io

# 启动并启用 Docker 服务
sudo systemctl start docker
sudo systemctl enable docker

# 将当前用户添加到 docker 组
sudo usermod -aG docker $USER
```

#### CentOS/RHEL
```bash
# 安装 Docker
sudo yum install -y yum-utils
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
sudo yum install -y docker-ce docker-ce-cli containerd.io

# 启动 Docker 服务
sudo systemctl start docker
sudo systemctl enable docker
```

### 2. 验证 Docker 安装
```bash
# 检查 Docker 版本
docker --version

# 测试 Docker 运行
docker run hello-world
```

## 部署方法

### 方法一：使用预构建镜像（推荐）

#### 1. 拉取官方镜像
```bash
# 拉取最新的 VyOS 镜像
docker pull vyos/vyos-build:current

# 或者使用社区维护的镜像
docker pull ghcr.io/vyos/vyos:latest
```

#### 2. 运行 VyOS 容器
```bash
# 创建并运行 VyOS 容器
docker run -d \
  --name vyos-router \
  --hostname vyos-router \
  --privileged \
  --restart unless-stopped \
  -v /lib/modules:/lib/modules:ro \
  -v vyos-config:/config \
  vyos/vyos-build:current \
  /sbin/init
```

### 方法二：从 ISO 手动构建

#### 1. 下载 VyOS ISO
```bash
# 创建工作目录
mkdir -p ~/vyos-build && cd ~/vyos-build

# 下载最新的 VyOS ISO（替换为实际下载链接）
wget https://downloads.vyos.io/rolling/current/vyos-1.5-rolling-latest-amd64.iso -O vyos.iso
```

#### 2. 提取文件系统
```bash
# 安装必要工具
sudo apt install -y squashfs-tools

# 挂载 ISO 文件
mkdir rootfs
sudo mount -o loop vyos.iso rootfs

# 提取 squashfs 文件系统
mkdir unsquashfs
sudo unsquashfs -f -d unsquashfs/ rootfs/live/filesystem.squashfs

# 创建 Docker 镜像
sudo tar -C unsquashfs -c . | docker import - vyos:custom
```

#### 3. 清理临时文件
```bash
# 卸载 ISO
sudo umount rootfs

# 删除临时目录
rm -rf rootfs unsquashfs vyos.iso
```

## 网络配置

### 1. 基础网络配置

#### 创建 Docker 网络
```bash
# 创建桥接网络
docker network create \
  --driver bridge \
  --subnet=192.168.100.0/24 \
  --gateway=192.168.100.1 \
  vyos-network
```

#### 运行容器并指定网络
```bash
docker run -d \
  --name vyos-router \
  --network vyos-network \
  --ip 192.168.100.10 \
  --privileged \
  -v /lib/modules:/lib/modules:ro \
  vyos:custom \
  /sbin/init
```

### 2. IPv6 支持配置

#### 修改 Docker 守护进程配置
```bash
# 编辑 Docker 配置文件
sudo nano /etc/docker/daemon.json

# 添加以下内容
{
  "ipv6": true,
  "fixed-cidr-v6": "2001:db8::/64"
}

# 重启 Docker 服务
sudo systemctl restart docker
```

#### 创建支持 IPv6 的网络
```bash
docker network create \
  --ipv6 \
  --subnet=192.168.100.0/24 \
  --subnet=2001:db8:100::/64 \
  vyos-ipv6-network
```

## VyOS 基础配置

### 1. 连接到 VyOS 容器
```bash
# 进入容器
docker exec -it vyos-router vbash

# 或者使用 vyos 用户登录
docker exec -it vyos-router su - vyos
```

### 2. 基本网络配置
```bash
# 进入配置模式
configure

# 配置主机名
set system host-name vyos-router

# 配置接口
set interfaces ethernet eth0 address 192.168.100.10/24
set interfaces ethernet eth0 description 'Docker Network'

# 配置默认路由
set protocols static route 0.0.0.0/0 next-hop 192.168.100.1

# 配置 DNS
set system name-server 8.8.8.8
set system name-server 8.8.4.4

# 提交并保存配置
commit
save

# 退出配置模式
exit
```

### 3. 配置 SSH 访问
```bash
# 进入配置模式
configure

# 启用 SSH 服务
set service ssh port 22
set service ssh listen-address 0.0.0.0

# 配置用户密码
set system login user vyos authentication plain-text-password 'your-password'

# 提交配置
commit
save
exit
```

## Docker Compose 部署

### 1. 创建 docker-compose.yml
```yaml
version: '3.8'

services:
  vyos-router:
    image: vyos/vyos-build:current
    container_name: vyos-router
    hostname: vyos-router
    privileged: true
    restart: unless-stopped
    
    volumes:
      - /lib/modules:/lib/modules:ro
      - vyos-config:/config
      - vyos-logs:/var/log
    
    networks:
      vyos-net:
        ipv4_address: 192.168.100.10
    
    ports:
      - "2222:22"    # SSH 访问
      - "443:443"    # HTTPS 管理界面
    
    environment:
      - VYOS_HOSTNAME=vyos-router
    
    command: /sbin/init

networks:
  vyos-net:
    driver: bridge
    enable_ipv6: true
    ipam:
      config:
        - subnet: 192.168.100.0/24
          gateway: 192.168.100.1
        - subnet: 2001:db8:100::/64

volumes:
  vyos-config:
    driver: local
  vyos-logs:
    driver: local
```

### 2. 启动服务
```bash
# 启动所有服务
docker-compose up -d

# 查看运行状态
docker-compose ps

# 查看日志
docker-compose logs vyos-router
```

## 管理操作

### 1. 容器管理
```bash
# 查看运行状态
docker ps

# 停止容器
docker stop vyos-router

# 启动容器
docker start vyos-router

# 重启容器
docker restart vyos-router

# 删除容器
docker rm vyos-router
```

### 2. 配置备份与恢复

#### 备份配置
```bash
# 备份当前配置
docker exec vyos-router cat /config/config.boot > vyos-backup-$(date +%Y%m%d).conf

# 或者备份整个配置目录
docker cp vyos-router:/config ./vyos-config-backup
```

#### 恢复配置
```bash
# 恢复配置文件
docker cp vyos-backup.conf vyos-router:/config/config.boot

# 重启容器使配置生效
docker restart vyos-router
```

### 3. 日志管理
```bash
# 查看容器日志
docker logs vyos-router

# 实时查看日志
docker logs -f vyos-router

# 查看 VyOS 系统日志
docker exec vyos-router tail -f /var/log/messages
```

## 性能优化

### 1. 资源限制
```bash
# 限制 CPU 和内存使用
docker run -d \
  --name vyos-router \
  --cpus="1.0" \
  --memory="1g" \
  --privileged \
  vyos:custom \
  /sbin/init
```

### 2. 存储优化
```bash
# 使用命名卷持久化数据
docker volume create vyos-config
docker volume create vyos-logs

# 挂载到容器
docker run -d \
  --name vyos-router \
  -v vyos-config:/config \
  -v vyos-logs:/var/log \
  vyos:custom
```

## 故障排除

### 1. 常见问题

#### 容器无法启动
```bash
# 检查容器状态
docker ps -a

# 查看详细错误信息
docker logs vyos-router

# 检查镜像是否存在
docker images | grep vyos
```

#### 网络连接问题
```bash
# 检查容器网络配置
docker inspect vyos-router | grep -A 10 NetworkSettings

# 测试网络连通性
docker exec vyos-router ping 8.8.8.8

# 检查路由表
docker exec vyos-router ip route show
```

#### 配置丢失
```bash
# 检查配置文件是否存在
docker exec vyos-router ls -la /config/

# 检查挂载点
docker inspect vyos-router | grep -A 5 Mounts
```

### 2. 调试命令
```bash
# 进入容器调试
docker exec -it vyos-router bash

# 检查系统状态
docker exec vyos-router systemctl status

# 查看进程列表
docker exec vyos-router ps aux

# 检查网络接口
docker exec vyos-router ip addr show
```

## 安全注意事项

### 1. 容器安全
- VyOS 容器需要特权模式运行，具有完整的系统访问权限
- 避免在生产环境中使用默认密码
- 定期更新容器镜像和基础系统
- 限制容器的网络访问范围

### 2. 网络安全
- 配置防火墙规则限制不必要的访问
- 使用 SSH 密钥认证替代密码认证
- 启用日志记录和监控
- 定期备份配置文件

### 3. 访问控制
```bash
# 配置 SSH 密钥认证
configure
set system login user vyos authentication public-keys admin key 'AAAAB3NzaC1yc2EAAAADAQABAAABgQC...'
set system login user vyos authentication public-keys admin type 'ssh-rsa'
commit
save
```

## 高级配置示例

### 1. 多接口路由器
```yaml
version: '3.8'

services:
  vyos-router:
    image: vyos/vyos-build:current
    container_name: vyos-router
    privileged: true
    restart: unless-stopped
    
    networks:
      - lan-network
      - wan-network
      - dmz-network
    
    volumes:
      - vyos-config:/config
      - /lib/modules:/lib/modules:ro

networks:
  lan-network:
    driver: bridge
    ipam:
      config:
        - subnet: 192.168.1.0/24
  
  wan-network:
    driver: bridge
    ipam:
      config:
        - subnet: 10.0.1.0/24
  
  dmz-network:
    driver: bridge
    ipam:
      config:
        - subnet: 172.16.1.0/24
```

### 2. VPN 服务器配置
```bash
# 配置 OpenVPN 服务器
configure

# 生成 CA 证书
run generate pki ca install ca-vyos

# 生成服务器证书
run generate pki certificate install server-vyos ca ca-vyos

# 配置 OpenVPN 接口
set interfaces openvpn vtun0 mode server
set interfaces openvpn vtun0 server subnet 10.8.0.0/24
set interfaces openvpn vtun0 tls ca-cert-file /config/auth/ca-vyos_ca.pem
set interfaces openvpn vtun0 tls cert-file /config/auth/server-vyos_cert.pem
set interfaces openvpn vtun0 tls key-file /config/auth/server-vyos_key.pem

commit
save
```

## 监控和维护

### 1. 系统监控
```bash
# CPU 和内存使用情况
docker exec vyos-router top

# 磁盘使用情况
docker exec vyos-router df -h

# 网络统计
docker exec vyos-router cat /proc/net/dev
```

### 2. 自动化脚本

#### 健康检查脚本
```bash
#!/bin/bash
# vyos-health-check.sh

CONTAINER_NAME="vyos-router"

# 检查容器状态
if ! docker ps | grep -q $CONTAINER_NAME; then
    echo "$(date): Container $CONTAINER_NAME is not running"
    docker start $CONTAINER_NAME
fi

# 检查网络连通性
if ! docker exec $CONTAINER_NAME ping -c 1 8.8.8.8 >/dev/null 2>&1; then
    echo "$(date): Network connectivity issue detected"
fi

echo "$(date): Health check completed"
```

#### 自动备份脚本
```bash
#!/bin/bash
# vyos-backup.sh

CONTAINER_NAME="vyos-router"
BACKUP_DIR="/backup/vyos"
DATE=$(date +%Y%m%d-%H%M%S)

# 创建备份目录
mkdir -p $BACKUP_DIR

# 备份配置
docker exec $CONTAINER_NAME cat /config/config.boot > $BACKUP_DIR/config-$DATE.boot

# 保留最近30天的备份
find $BACKUP_DIR -name "config-*.boot" -mtime +30 -delete

echo "$(date): Backup completed - config-$DATE.boot"
```

## 总结

本文档详细介绍了 VyOS Docker 容器化部署的完整流程，包括：

1. **环境准备**: Docker 安装和配置
2. **部署方法**: 预构建镜像和手动构建两种方式
3. **网络配置**: IPv4/IPv6 网络设置
4. **基础配置**: VyOS 系统初始化配置
5. **容器编排**: Docker Compose 批量部署
6. **运维管理**: 备份、监控和故障排除
7. **安全加固**: 访问控制和安全最佳实践

通过 Docker 容器化部署 VyOS，可以快速搭建网络测试环境，简化管理和维护工作。在生产环境使用时，需要特别注意安全配置和性能优化。

## 参考资源

- [VyOS 官方文档](https://docs.vyos.io/)
- [Docker 官方文档](https://docs.docker.com/)
- [VyOS Docker 容器指南](https://docs.vyos.io/en/latest/installation/virtual/docker.html)
- [VyOS 社区论坛](https://forum.vyos.io/)