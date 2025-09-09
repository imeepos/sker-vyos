# VyOS API 接口文档

## 概述

VyOS 提供了一个 HTTP API，允许通过编程方式访问系统配置和操作命令。API 通过 RESTful 端点支持配置管理和操作监控。

## 认证

VyOS API 在所有端点（除了 `/info`）都需要 API 密钥进行身份验证。

**认证方法:**
- API 密钥必须作为表单数据中的 `key` 参数包含
- API 密钥在 VyOS 配置中设置
- 必须启用 HTTPS 才能访问 API

**认证示例:**
```bash
curl --location --request POST 'https://vyos/retrieve' \
--form data='{"op": "showConfig", "path": []}' \
--form key='MY-HTTPS-API-PLAINTEXT-KEY'
```

## 基本响应格式

所有 API 响应都遵循一致的 JSON 结构：

```json
{
  "success": true|false,
  "data": "响应数据",
  "error": "如果 success 为 false 时的错误消息"
}
```

## 端点

### 1. 系统信息

#### GET `/info`
获取基本系统信息。

**认证:** 不需要

**参数:**
- `version` (可选): 获取版本信息
- `hostname` (可选): 获取主机名

**示例:**
```bash
curl -X GET "https://vyos/info"
```

### 2. 配置检索

#### POST `/retrieve`
从系统检索配置数据。

**认证:** 需要

**操作:**
- `showConfig`: 显示配置
- `returnValues`: 返回配置值
- `exists`: 检查配置路径是否存在

**请求格式:**
```json
{
  "op": "showConfig|returnValues|exists",
  "path": ["路径", "元素"]
}
```

**示例:**
```bash
# 显示完整配置
curl -X POST 'https://vyos/retrieve' \
--form data='{"op": "showConfig", "path": []}' \
--form key='API_KEY'

# 显示特定路径
curl -X POST 'https://vyos/retrieve' \
--form data='{"op": "showConfig", "path": ["interfaces", "ethernet"]}' \
--form key='API_KEY'

# 检查路径是否存在
curl -X POST 'https://vyos/retrieve' \
--form data='{"op": "exists", "path": ["interfaces", "ethernet", "eth0"]}' \
--form key='API_KEY'
```

### 3. 配置管理

#### POST `/configure`
修改系统配置。

**认证:** 需要

**操作:**
- `set`: 创建或修改配置
- `delete`: 删除配置
- `comment`: 给配置添加注释

**请求格式:**
```json
{
  "op": "set|delete|comment",
  "path": ["路径", "元素"],
  "value": "配置值"
}
```

**示例:**
```bash
# 设置配置
curl -X POST 'https://vyos/configure' \
--form data='{"op": "set", "path": ["interfaces", "ethernet", "eth0", "address"], "value": "192.168.1.1/24"}' \
--form key='API_KEY'

# 删除配置
curl -X POST 'https://vyos/configure' \
--form data='{"op": "delete", "path": ["interfaces", "ethernet", "eth0", "address", "192.168.1.1/24"]}' \
--form key='API_KEY'

# 多个操作
curl -X POST 'https://vyos/configure' \
--form data='[
  {"op": "set", "path": ["interfaces", "ethernet", "eth0", "address"], "value": "192.168.1.1/24"},
  {"op": "set", "path": ["interfaces", "ethernet", "eth0", "description"], "value": "LAN接口"}
]' \
--form key='API_KEY'
```

### 4. 配置文件操作

#### POST `/config-file`
管理配置文件。

**认证:** 需要

**操作:**
- `save`: 将当前配置保存到文件
- `load`: 从文件加载配置
- `merge`: 从文件合并配置

**请求格式:**
```json
{
  "op": "save|load|merge",
  "file": "文件名"
}
```

**示例:**
```bash
# 保存配置
curl -X POST 'https://vyos/config-file' \
--form data='{"op": "save", "file": "/config/backup.config"}' \
--form key='API_KEY'

# 加载配置
curl -X POST 'https://vyos/config-file' \
--form data='{"op": "load", "file": "/config/backup.config"}' \
--form key='API_KEY'
```

### 5. 操作命令

#### POST `/show`
执行操作显示命令。

**认证:** 需要

**请求格式:**
```json
{
  "op": "show",
  "path": ["命令", "参数"]
}
```

**示例:**
```bash
curl -X POST 'https://vyos/show' \
--form data='{"op": "show", "path": ["interfaces"]}' \
--form key='API_KEY'
```

### 6. 系统控制

#### POST `/reset`
执行重置命令。

**认证:** 需要

**请求格式:**
```json
{
  "op": "reset",
  "path": ["命令", "参数"]
}
```

#### POST `/reboot`
启动系统重启。

**认证:** 需要

**请求格式:**
```json
{
  "op": "reboot"
}
```

#### POST `/poweroff`
关闭系统。

**认证:** 需要

**请求格式:**
```json
{
  "op": "poweroff"
}
```

### 7. 镜像管理

#### POST `/image`
管理系统镜像。

**认证:** 需要

**请求格式:**
```json
{
  "op": "add|delete|set",
  "path": ["image", "操作"]
}
```

### 8. 生成操作

#### POST `/generate`
生成系统项目，如密钥、证书等。

**认证:** 需要

**请求格式:**
```json
{
  "op": "generate",
  "path": ["generate", "类型", "参数"]
}
```

## 提交确认功能

API 支持提交确认功能，用于安全的配置更改：

**请求格式:**
```json
{
  "op": "set",
  "path": ["配置", "路径"],
  "value": "值",
  "commit-confirm": 600
}
```

- 更改被临时应用
- 超时后自动恢复（以秒为单位）
- 必须确认才能永久生效

**确认更改:**
```bash
curl -X POST 'https://vyos/configure' \
--form data='{"op": "confirm"}' \
--form key='API_KEY'
```

## 错误处理

**常见的 HTTP 状态码:**
- `200`: 成功
- `400`: 错误请求（无效的 JSON，缺少参数）
- `401`: 未授权（无效的 API 密钥）
- `500`: 内部服务器错误

**错误响应格式:**
```json
{
  "success": false,
  "error": "详细的错误消息",
  "data": null
}
```

## 最佳实践

1. **始终使用 HTTPS** 进行 API 通信
2. **保护 API 密钥** - 安全存储并定期轮换
3. **使用提交确认** 进行关键配置更改
4. **优雅地处理错误** - 检查响应中的 `success` 字段
5. **尽可能批量操作** 以减少 API 调用
6. **在实验室环境中测试更改** 再部署到生产环境

## 配置要求

要启用 VyOS API，需要配置：

```vyos
set service https api keys id <key-id> key <api-key>
set service https port <port>
set service https certificates system-generated-certificate
```

## 速率限制

请注意 API 速率限制，在自动化脚本中在请求之间实现适当的延迟，以避免系统过载。