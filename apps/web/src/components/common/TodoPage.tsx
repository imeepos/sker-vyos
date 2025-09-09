import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Construction, Clock } from 'lucide-react';

interface TodoPageProps {
  title: string;
  description: string;
}

export function TodoPage({ title, description }: TodoPageProps) {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
            <Construction className="h-8 w-8 text-muted-foreground" />
          </div>
          <CardTitle className="flex items-center justify-center gap-2">
            {title}
            <Badge variant="secondary" className="gap-1">
              <Clock className="h-3 w-3" />
              TODO
            </Badge>
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="text-center text-sm text-muted-foreground">
          <p>此页面正在规划中，将在后续版本中实现具体功能。</p>
          <p className="mt-2">当前处于框架搭建阶段，仅作为页面占位符使用。</p>
        </CardContent>
      </Card>
    </div>
  );
}