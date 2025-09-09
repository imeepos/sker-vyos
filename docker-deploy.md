# Docker 安装与国内镜像源配置文档

## 概述

本文档详细介绍在各种 Linux 发行版上安装 Docker，并配置国内镜像源以加速镜像下载的完整流程。适用于在中国大陆网络环境下的 Docker 部署和配置。

## 系统要求

### 硬件要求
- CPU: x86_64 或 ARM64 架构
- 内存: 最少 2GB，推荐 4GB 以上
- 磁盘: 最少 20GB 可用空间
- 网络: 稳定的互联网连接

### 操作系统要求
- Ubuntu 18.04 LTS 或更高版本
- Debian 9 或更高版本
- CentOS 7 或更高版本
- RHEL 7 或更高版本
- Fedora 30 或更高版本
- 其他主流 Linux 发行版

## Docker 安装

### Ubuntu/Debian 系统安装

#### 方法一：使用官方安装脚本（推荐）
```bash
# 更新软件包索引
sudo apt update

# 安装必要的依赖包
sudo apt install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

# 添加 Docker 官方 GPG 密钥
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# 添加 Docker APT 仓库
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# 更新软件包索引
sudo apt update

# 安装 Docker Engine
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# 启动并启用 Docker 服务
sudo systemctl start docker
sudo systemctl enable docker
```

#### 方法二：使用阿里云镜像源（国内推荐）
```bash
# 更新软件包索引
sudo apt update

# 安装必要的依赖包
sudo apt install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

# 添加阿里云 Docker GPG 密钥
curl -fsSL https://mirrors.aliyun.com/docker-ce/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# 添加阿里云 Docker APT 仓库
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://mirrors.aliyun.com/docker-ce/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# 更新软件包索引
sudo apt update

# 安装 Docker Engine
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# 启动并启用 Docker 服务
sudo systemctl start docker
sudo systemctl enable docker
```

#### 方法三：Debian 系统专用
```bash
# 更新软件包索引
sudo apt update

# 安装依赖包
sudo apt install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

# 添加 Docker GPG 密钥
curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# 添加 Docker APT 仓库
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/debian \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# 更新并安装
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# 启动服务
sudo systemctl start docker
sudo systemctl enable docker
```

### CentOS/RHEL 系统安装

#### 方法一：使用官方 YUM 仓库
```bash
# 安装必要的工具
sudo yum install -y yum-utils

# 添加 Docker 官方 YUM 仓库
sudo yum-config-manager \
    --add-repo \
    https://download.docker.com/linux/centos/docker-ce.repo

# 安装 Docker Engine
sudo yum install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# 启动并启用 Docker 服务
sudo systemctl start docker
sudo systemctl enable docker
```

#### 方法二：使用阿里云镜像源（国内推荐）
```bash
# 安装必要的工具
sudo yum install -y yum-utils

# 添加阿里云 Docker YUM 仓库
sudo yum-config-manager \
    --add-repo \
    https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo

# 更新 YUM 缓存
sudo yum makecache fast

# 安装 Docker Engine
sudo yum install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# 启动并启用 Docker 服务
sudo systemctl start docker
sudo systemctl enable docker
```

#### CentOS 8/RHEL 8 特殊处理
```bash
# 安装 dnf-plugins-core
sudo dnf install -y dnf-plugins-core

# 添加 Docker 仓库
sudo dnf config-manager \
    --add-repo \
    https://download.docker.com/linux/centos/docker-ce.repo

# 安装 Docker
sudo dnf install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# 启动服务
sudo systemctl start docker
sudo systemctl enable docker
```

### Fedora 系统安装

```bash
# 安装 dnf-plugins-core
sudo dnf install -y dnf-plugins-core

# 添加 Docker 仓库
sudo dnf config-manager \
    --add-repo \
    https://download.docker.com/linux/fedora/docker-ce.repo

# 安装 Docker Engine
sudo dnf install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# 启动并启用 Docker 服务
sudo systemctl start docker
sudo systemctl enable docker
```

### Arch Linux 系统安装

```bash
# 更新系统
sudo pacman -Syu

# 安装 Docker
sudo pacman -S docker docker-compose

# 启动并启用 Docker 服务
sudo systemctl start docker.service
sudo systemctl enable docker.service
```

## 用户权限配置

### 将用户添加到 docker 组
```bash
# 创建 docker 组（如果不存在）
sudo groupadd docker

# 将当前用户添加到 docker 组
sudo usermod -aG docker $USER

# 重新登录或使用以下命令刷新组权限
newgrp docker

# 测试 Docker 是否可以无 sudo 运行
docker run hello-world
```

### 验证安装
```bash
# 检查 Docker 版本
docker --version
docker-compose --version

# 查看 Docker 信息
docker info

# 测试 Docker 运行
docker run hello-world
```

## 国内镜像源配置

### Docker Hub 镜像加速器配置

#### 方法一：配置 daemon.json 文件
```bash
# 创建 Docker 配置目录
sudo mkdir -p /etc/docker

# 创建配置文件
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": [
    "https://docker.mirrors.ustc.edu.cn",
    "https://hub-mirror.c.163.com",
    "https://mirror.baidubce.com",
    "https://ccr.ccs.tencentyun.com"
  ],
  "exec-opts": ["native.cgroupdriver=systemd"],
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "100m",
    "max-file": "3"
  },
  "storage-driver": "overlay2",
  "storage-opts": [
    "overlay2.override_kernel_check=true"
  ]
}
EOF

# 重新加载 Docker 守护进程配置
sudo systemctl daemon-reload

# 重启 Docker 服务
sudo systemctl restart docker

# 验证配置是否生效
docker info | grep -A 10 "Registry Mirrors"
```

#### 方法二：阿里云容器镜像服务（推荐）
```bash
# 注册阿里云账号并获取专属加速地址
# 访问：https://cr.console.aliyun.com/cn-hangzhou/instances/mirrors

# 配置阿里云镜像加速器
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": [
    "https://your-id.mirror.aliyuncs.com",
    "https://docker.mirrors.ustc.edu.cn",
    "https://hub-mirror.c.163.com"
  ],
  "exec-opts": ["native.cgroupdriver=systemd"],
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "100m"
  },
  "storage-driver": "overlay2"
}
EOF

# 重启 Docker
sudo systemctl daemon-reload
sudo systemctl restart docker
```

### 常用国内镜像源列表

#### Docker Hub 镜像加速器
```json
{
  "registry-mirrors": [
    "https://docker.mirrors.ustc.edu.cn",          // 中科大镜像
    "https://hub-mirror.c.163.com",                // 网易镜像
    "https://mirror.baidubce.com",                 // 百度云镜像
    "https://ccr.ccs.tencentyun.com",              // 腾讯云镜像
    "https://registry.docker-cn.com",              // Docker 中国镜像
    "https://dockerhub.azk8s.cn",                  // Azure 中国镜像
    "https://reg-mirror.qiniu.com"                 // 七牛云镜像
  ]
}
```

#### 各大云服务商镜像加速器

##### 阿里云容器镜像服务
```bash
# 获取专属加速地址
# 1. 登录阿里云控制台
# 2. 搜索"容器镜像服务"
# 3. 点击"镜像工具" -> "镜像加速器"
# 4. 复制专属加速地址

# 示例配置
{
  "registry-mirrors": [
    "https://abc123.mirror.aliyuncs.com"
  ]
}
```

##### 腾讯云容器镜像服务
```bash
# 腾讯云镜像加速器
{
  "registry-mirrors": [
    "https://mirror.ccs.tencentyun.com"
  ]
}
```

##### 华为云容器镜像服务
```bash
# 华为云镜像加速器
{
  "registry-mirrors": [
    "https://swr.cn-north-1.myhuaweicloud.com"
  ]
}
```

## 高级配置

### Docker 存储驱动优化
```bash
# 查看当前存储驱动
docker info | grep "Storage Driver"

# 配置 overlay2 存储驱动（推荐）
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": [
    "https://docker.mirrors.ustc.edu.cn"
  ],
  "storage-driver": "overlay2",
  "storage-opts": [
    "overlay2.override_kernel_check=true"
  ],
  "exec-opts": ["native.cgroupdriver=systemd"],
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "100m",
    "max-file": "3"
  },
  "data-root": "/var/lib/docker",
  "experimental": false,
  "features": {
    "buildkit": true
  }
}
EOF
```

### 内存和 CPU 限制配置
```bash
# 配置资源限制
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": [
    "https://docker.mirrors.ustc.edu.cn"
  ],
  "default-runtime": "runc",
  "runtimes": {
    "runc": {
      "path": "runc"
    }
  },
  "default-ulimits": {
    "nofile": {
      "Hard": 64000,
      "Name": "nofile",
      "Soft": 64000
    }
  },
  "max-concurrent-downloads": 10,
  "max-concurrent-uploads": 5
}
EOF
```

### IPv6 支持配置
```bash
# 启用 IPv6 支持
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": [
    "https://docker.mirrors.ustc.edu.cn"
  ],
  "ipv6": true,
  "fixed-cidr-v6": "2001:db8:1::/64",
  "experimental": true,
  "ip6tables": true
}
EOF

# 重启 Docker
sudo systemctl restart docker
```

## 网络代理配置

### HTTP/HTTPS 代理配置

#### 为 Docker 守护进程配置代理
```bash
# 创建 systemd 配置目录
sudo mkdir -p /etc/systemd/system/docker.service.d

# 创建代理配置文件
sudo tee /etc/systemd/system/docker.service.d/http-proxy.conf <<-'EOF'
[Service]
Environment="HTTP_PROXY=http://proxy.example.com:8080"
Environment="HTTPS_PROXY=http://proxy.example.com:8080"
Environment="NO_PROXY=localhost,127.0.0.1,docker-registry.example.com,.corp"
EOF

# 重新加载配置并重启 Docker
sudo systemctl daemon-reload
sudo systemctl restart docker

# 验证代理配置
sudo systemctl show --property=Environment docker
```

#### 为 Docker 客户端配置代理
```bash
# 创建用户配置目录
mkdir -p ~/.docker

# 创建客户端代理配置
tee ~/.docker/config.json <<-'EOF'
{
  "proxies": {
    "default": {
      "httpProxy": "http://proxy.example.com:8080",
      "httpsProxy": "http://proxy.example.com:8080",
      "noProxy": "*.test.example.com,.example2.com,127.0.0.0/8"
    }
  }
}
EOF
```

### 测试镜像加速效果

```bash
# 清理本地镜像
docker system prune -a -f

# 测试下载速度
time docker pull nginx:latest
time docker pull mysql:8.0
time docker pull redis:alpine

# 查看镜像来源
docker images --format "table {{.Repository}}\t{{.Tag}}\t{{.Size}}"
```

## 常见问题解决

### 1. 权限问题
```bash
# 问题：Got permission denied while trying to connect to the Docker daemon socket
# 解决方案：
sudo groupadd docker
sudo usermod -aG docker $USER
newgrp docker

# 或者临时使用 sudo
sudo docker run hello-world
```

### 2. 服务启动失败
```bash
# 检查 Docker 服务状态
sudo systemctl status docker

# 查看详细日志
sudo journalctl -u docker.service -f

# 重启 Docker 服务
sudo systemctl restart docker
```

### 3. 镜像拉取缓慢
```bash
# 检查当前镜像源配置
docker info | grep -A 10 "Registry Mirrors"

# 测试镜像源连通性
curl -I https://docker.mirrors.ustc.edu.cn/v2/

# 更换镜像源
sudo nano /etc/docker/daemon.json
sudo systemctl restart docker
```

### 4. 存储空间不足
```bash
# 查看 Docker 磁盘使用情况
docker system df

# 清理未使用的镜像和容器
docker system prune -a

# 清理所有数据（谨慎使用）
docker system prune -a --volumes
```

### 5. 网络连接问题
```bash
# 检查 Docker 网络
docker network ls

# 测试容器网络连通性
docker run --rm -it busybox ping 8.8.8.8

# 重置 Docker 网络
sudo systemctl stop docker
sudo ip link delete docker0
sudo systemctl start docker
```

## 安全配置

### 1. 启用 Docker 内容信任
```bash
# 启用内容信任
export DOCKER_CONTENT_TRUST=1

# 配置到 shell 配置文件
echo 'export DOCKER_CONTENT_TRUST=1' >> ~/.bashrc
source ~/.bashrc
```

### 2. 配置 Docker 根目录权限
```bash
# 设置适当的权限
sudo chmod 700 /var/lib/docker

# 检查权限
ls -la /var/lib/docker
```

### 3. 启用审计日志
```bash
# 配置审计规则
sudo tee -a /etc/audit/audit.rules <<-'EOF'
-w /usr/bin/docker -p wa
-w /var/lib/docker -p wa
-w /etc/docker -p wa
-w /lib/systemd/system/docker.service -p wa
-w /lib/systemd/system/docker.socket -p wa
-w /etc/default/docker -p wa
-w /etc/docker/daemon.json -p wa
-w /usr/bin/docker-containerd -p wa
-w /usr/bin/docker-runc -p wa
EOF

# 重启审计服务
sudo systemctl restart auditd
```

## 性能优化

### 1. 调整存储驱动参数
```bash
# 配置 overlay2 参数优化
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": [
    "https://docker.mirrors.ustc.edu.cn"
  ],
  "storage-driver": "overlay2",
  "storage-opts": [
    "overlay2.override_kernel_check=true",
    "overlay2.size=20G"
  ]
}
EOF
```

### 2. 调整日志配置
```bash
# 限制日志大小和文件数量
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  }
}
```

### 3. 启用 BuildKit
```bash
# 启用 BuildKit 构建器
{
  "features": {
    "buildkit": true
  }
}

# 或使用环境变量
export DOCKER_BUILDKIT=1
```

## 自动化安装脚本

### 通用安装脚本
```bash
#!/bin/bash
# docker-install.sh - Docker 自动安装脚本

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 日志函数
log() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
    exit 1
}

# 检测操作系统
detect_os() {
    if [ -f /etc/os-release ]; then
        . /etc/os-release
        OS=$ID
        VER=$VERSION_ID
    else
        error "无法检测操作系统版本"
    fi
}

# 安装 Docker
install_docker() {
    log "检测到操作系统: $OS $VER"
    
    case $OS in
        ubuntu|debian)
            log "使用 APT 安装 Docker..."
            sudo apt update
            sudo apt install -y apt-transport-https ca-certificates curl gnupg lsb-release
            
            curl -fsSL https://mirrors.aliyun.com/docker-ce/linux/$OS/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
            
            echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://mirrors.aliyun.com/docker-ce/linux/$OS $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
            
            sudo apt update
            sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
            ;;
        centos|rhel)
            log "使用 YUM 安装 Docker..."
            sudo yum install -y yum-utils
            sudo yum-config-manager --add-repo https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
            sudo yum install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
            ;;
        fedora)
            log "使用 DNF 安装 Docker..."
            sudo dnf install -y dnf-plugins-core
            sudo dnf config-manager --add-repo https://download.docker.com/linux/fedora/docker-ce.repo
            sudo dnf install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
            ;;
        *)
            error "不支持的操作系统: $OS"
            ;;
    esac
}

# 配置 Docker
configure_docker() {
    log "配置 Docker 镜像加速器..."
    
    sudo mkdir -p /etc/docker
    sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": [
    "https://docker.mirrors.ustc.edu.cn",
    "https://hub-mirror.c.163.com",
    "https://mirror.baidubce.com"
  ],
  "exec-opts": ["native.cgroupdriver=systemd"],
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "100m",
    "max-file": "3"
  },
  "storage-driver": "overlay2",
  "storage-opts": [
    "overlay2.override_kernel_check=true"
  ]
}
EOF

    # 启动并启用 Docker
    sudo systemctl start docker
    sudo systemctl enable docker
    
    # 添加用户到 docker 组
    sudo groupadd docker 2>/dev/null || true
    sudo usermod -aG docker $USER
    
    log "Docker 配置完成"
}

# 验证安装
verify_installation() {
    log "验证 Docker 安装..."
    
    if command -v docker >/dev/null 2>&1; then
        log "Docker 版本: $(docker --version)"
        log "Docker Compose 版本: $(docker compose version)"
        
        # 测试 Docker 运行
        if sudo docker run hello-world >/dev/null 2>&1; then
            log "Docker 安装验证成功！"
        else
            warn "Docker 运行测试失败，请检查配置"
        fi
    else
        error "Docker 安装失败"
    fi
}

# 主函数
main() {
    log "开始安装 Docker..."
    
    detect_os
    install_docker
    configure_docker
    verify_installation
    
    log "安装完成！请重新登录或运行 'newgrp docker' 以使用 Docker"
    log "测试命令: docker run hello-world"
}

# 执行主函数
main "$@"
```

### 使用安装脚本
```bash
# 下载并执行安装脚本
curl -fsSL https://your-domain.com/docker-install.sh | bash

# 或者下载后执行
wget https://your-domain.com/docker-install.sh
chmod +x docker-install.sh
./docker-install.sh
```

## 总结

本文档提供了在各种 Linux 发行版上安装 Docker 并配置国内镜像源的完整指南，包括：

1. **多系统支持**: Ubuntu、Debian、CentOS、RHEL、Fedora、Arch Linux
2. **镜像加速**: 配置多个国内镜像源以提高下载速度
3. **安全配置**: 用户权限、内容信任、审计日志等安全措施
4. **性能优化**: 存储驱动、日志管理、BuildKit 等优化配置
5. **故障排除**: 常见问题的诊断和解决方法
6. **自动化**: 提供一键安装脚本简化部署流程

通过本文档的配置，可以在中国大陆网络环境下快速、稳定地部署和使用 Docker 容器技术。

## 参考资源

- [Docker 官方文档](https://docs.docker.com/)
- [Docker CE 安装指南](https://docs.docker.com/engine/install/)
- [阿里云容器镜像服务](https://cr.console.aliyun.com/)
- [中科大 Docker 镜像](https://mirrors.ustc.edu.cn/help/dockerhub.html)
- [网易 Docker 镜像](https://hub-mirror.c.163.com/)