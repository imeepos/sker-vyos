import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function ShadcnDemo() {
  return (
    <div className="min-h-screen bg-background text-foreground p-8 space-y-8">
      <div className="max-w-6xl mx-auto">
        {/* 标题部分 */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl font-bold">Shadcn/UI 组件展示</h1>
          <p className="text-muted-foreground text-lg">基于 Tailwind CSS 的现代化组件库</p>
        </div>

        {/* 按钮展示 */}
        <Card>
          <CardHeader>
            <CardTitle>按钮组件</CardTitle>
            <CardDescription>不同变体和尺寸的按钮</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <Button>默认按钮</Button>
              <Button variant="secondary">次要按钮</Button>
              <Button variant="outline">轮廓按钮</Button>
              <Button variant="ghost">幽灵按钮</Button>
              <Button variant="destructive">危险按钮</Button>
              <Button variant="link">链接按钮</Button>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button size="sm">小按钮</Button>
              <Button>默认大小</Button>
              <Button size="lg">大按钮</Button>
            </div>
          </CardContent>
        </Card>

        {/* 表单组件 */}
        <Card>
          <CardHeader>
            <CardTitle>表单组件</CardTitle>
            <CardDescription>输入框和标签组合</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">用户名</Label>
                <Input id="name" placeholder="请输入用户名" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">邮箱</Label>
                <Input id="email" type="email" placeholder="请输入邮箱" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">密码</Label>
                <Input id="password" type="password" placeholder="请输入密码" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm">确认密码</Label>
                <Input id="confirm" type="password" placeholder="请确认密码" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 标签页组件 */}
        <Card>
          <CardHeader>
            <CardTitle>标签页组件</CardTitle>
            <CardDescription>切换不同内容区域</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="tab1" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="tab1">仪表板</TabsTrigger>
                <TabsTrigger value="tab2">基础设施</TabsTrigger>
                <TabsTrigger value="tab3">配置管理</TabsTrigger>
              </TabsList>
              <TabsContent value="tab1" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-2xl font-bold text-dashboard">128</div>
                      <p className="text-xs text-muted-foreground">活跃设备</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-2xl font-bold text-success-base">99.9%</div>
                      <p className="text-xs text-muted-foreground">在线率</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-2xl font-bold text-warning-base">3</div>
                      <p className="text-xs text-muted-foreground">待处理警告</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="tab2">
                <p className="text-muted-foreground">基础设施监控面板内容...</p>
              </TabsContent>
              <TabsContent value="tab3">
                <p className="text-muted-foreground">配置管理界面内容...</p>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* 徽章和分割线 */}
        <Card>
          <CardHeader>
            <CardTitle>徽章组件</CardTitle>
            <CardDescription>状态标识和分类标签</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge>默认</Badge>
              <Badge variant="secondary">次要</Badge>
              <Badge variant="outline">轮廓</Badge>
              <Badge variant="destructive">危险</Badge>
            </div>
            <Separator />
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-dashboard text-white">仪表板</Badge>
              <Badge className="bg-infrastructure text-white">基础设施</Badge>
              <Badge className="bg-configuration text-white">配置管理</Badge>
              <Badge className="bg-operations text-white">运维操作</Badge>
              <Badge className="bg-security text-white">安全管理</Badge>
              <Badge className="bg-services text-white">服务管理</Badge>
            </div>
          </CardContent>
        </Card>

        {/* 表格组件 */}
        <Card>
          <CardHeader>
            <CardTitle>表格组件</CardTitle>
            <CardDescription>数据展示表格</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>设备名称</TableHead>
                  <TableHead>IP地址</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead>在线时间</TableHead>
                  <TableHead>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">VyOS-Router-01</TableCell>
                  <TableCell>192.168.1.1</TableCell>
                  <TableCell>
                    <Badge className="bg-success-base text-white">在线</Badge>
                  </TableCell>
                  <TableCell>24小时</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">管理</Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">VyOS-Router-02</TableCell>
                  <TableCell>192.168.1.2</TableCell>
                  <TableCell>
                    <Badge className="bg-warning-base text-white">维护中</Badge>
                  </TableCell>
                  <TableCell>12小时</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">管理</Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">VyOS-Router-03</TableCell>
                  <TableCell>192.168.1.3</TableCell>
                  <TableCell>
                    <Badge variant="destructive">离线</Badge>
                  </TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">管理</Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}