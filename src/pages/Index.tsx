import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Task {
  id: string;
  title: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  project: string;
}

interface Notification {
  id: string;
  type: 'deadline' | 'change';
  message: string;
  time: string;
}

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const [tasks] = useState<Task[]>([
    { id: '1', title: 'Разработать API эндпоинты', status: 'in-progress', priority: 'high', dueDate: '2025-11-16', project: 'Backend v2.0' },
    { id: '2', title: 'Дизайн главной страницы', status: 'todo', priority: 'medium', dueDate: '2025-11-18', project: 'Redesign' },
    { id: '3', title: 'Настроить CI/CD', status: 'done', priority: 'high', dueDate: '2025-11-14', project: 'DevOps' },
    { id: '4', title: 'Тестирование UI компонентов', status: 'in-progress', priority: 'medium', dueDate: '2025-11-17', project: 'Frontend' },
    { id: '5', title: 'Оптимизация базы данных', status: 'todo', priority: 'low', dueDate: '2025-11-20', project: 'Backend v2.0' },
  ]);

  const [notifications] = useState<Notification[]>([
    { id: '1', type: 'deadline', message: 'Дедлайн "Разработать API" через 2 дня', time: '10 мин назад' },
    { id: '2', type: 'change', message: 'Задача "Настроить CI/CD" завершена', time: '1 час назад' },
    { id: '3', type: 'deadline', message: 'Просрочен дедлайн "Код ревью"', time: '2 часа назад' },
  ]);

  const statusCount = {
    todo: tasks.filter(t => t.status === 'todo').length,
    'in-progress': tasks.filter(t => t.status === 'in-progress').length,
    done: tasks.filter(t => t.status === 'done').length,
  };

  const completionRate = Math.round((statusCount.done / tasks.length) * 100);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-accent text-accent-foreground';
      case 'medium': return 'bg-secondary text-secondary-foreground';
      case 'low': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'done': return 'bg-primary/20 text-primary border-primary/50';
      case 'in-progress': return 'bg-secondary/20 text-secondary border-secondary/50';
      default: return 'bg-muted/20 text-muted-foreground border-muted';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <aside className="w-64 min-h-screen cyber-border border-r p-6 space-y-6">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold neon-text tracking-wider">CYBER TASKS</h1>
            <p className="text-xs text-muted-foreground font-mono">v2.077</p>
          </div>

          <nav className="space-y-2">
            {[
              { id: 'dashboard', icon: 'LayoutDashboard', label: 'Дашборд' },
              { id: 'tasks', icon: 'CheckSquare', label: 'Задачи' },
              { id: 'projects', icon: 'FolderKanban', label: 'Проекты' },
              { id: 'calendar', icon: 'Calendar', label: 'Календарь' },
              { id: 'analytics', icon: 'BarChart3', label: 'Аналитика' },
              { id: 'settings', icon: 'Settings', label: 'Настройки' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeTab === item.id
                    ? 'bg-primary text-primary-foreground neon-glow'
                    : 'hover:bg-muted text-muted-foreground'
                }`}
              >
                <Icon name={item.icon as any} size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="pt-6 border-t border-border">
            <div className="flex items-center gap-3 px-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center neon-glow">
                <span className="text-sm font-bold">UN</span>
              </div>
              <div>
                <p className="text-sm font-medium">User Name</p>
                <p className="text-xs text-muted-foreground font-mono">admin</p>
              </div>
            </div>
          </div>
        </aside>

        <main className="flex-1 p-8">
          {activeTab === 'dashboard' && (
            <div className="space-y-6 animate-slide-up">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight">Дашборд</h2>
                  <p className="text-muted-foreground mt-1">Обзор ваших задач и проектов</p>
                </div>
                <Button className="neon-glow">
                  <Icon name="Plus" size={16} className="mr-2" />
                  Новая задача
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <Card className="p-6 cyber-border hover:neon-glow transition-all">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground font-mono">К ВЫПОЛНЕНИЮ</p>
                      <p className="text-4xl font-bold mt-2 neon-text">{statusCount.todo}</p>
                    </div>
                    <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                      <Icon name="Circle" size={24} className="text-muted-foreground" />
                    </div>
                  </div>
                </Card>

                <Card className="p-6 cyber-border hover:neon-glow transition-all">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground font-mono">В ПРОЦЕССЕ</p>
                      <p className="text-4xl font-bold mt-2 text-secondary">{statusCount['in-progress']}</p>
                    </div>
                    <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center">
                      <Icon name="Loader" size={24} className="text-secondary" />
                    </div>
                  </div>
                </Card>

                <Card className="p-6 cyber-border hover:neon-glow transition-all">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground font-mono">ЗАВЕРШЕНО</p>
                      <p className="text-4xl font-bold mt-2 text-primary">{statusCount.done}</p>
                    </div>
                    <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                      <Icon name="CheckCircle2" size={24} className="text-primary" />
                    </div>
                  </div>
                </Card>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <Card className="p-6 cyber-border">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Icon name="TrendingUp" size={20} className="text-primary" />
                    Прогресс выполнения
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-mono">Общий прогресс</span>
                        <span className="text-sm font-bold text-primary">{completionRate}%</span>
                      </div>
                      <Progress value={completionRate} className="h-2" />
                    </div>
                    <div className="grid grid-cols-3 gap-4 pt-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-primary">{tasks.length}</p>
                        <p className="text-xs text-muted-foreground font-mono mt-1">Всего задач</p>
                      </div>
                      <div className="text-center border-x border-border">
                        <p className="text-2xl font-bold text-secondary">{statusCount['in-progress']}</p>
                        <p className="text-xs text-muted-foreground font-mono mt-1">Активных</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-accent">3</p>
                        <p className="text-xs text-muted-foreground font-mono mt-1">Проектов</p>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 cyber-border">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Icon name="Bell" size={20} className="text-accent" />
                    Уведомления
                  </h3>
                  <div className="space-y-3">
                    {notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                      >
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          notif.type === 'deadline' ? 'bg-accent animate-glow-pulse' : 'bg-primary'
                        }`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm">{notif.message}</p>
                          <p className="text-xs text-muted-foreground font-mono mt-1">{notif.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              <Card className="p-6 cyber-border">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Icon name="Zap" size={20} className="text-primary" />
                  Активные задачи
                </h3>
                <div className="space-y-3">
                  {tasks.filter(t => t.status !== 'done').slice(0, 4).map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center justify-between p-4 rounded-lg cyber-border hover:neon-glow transition-all group"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className={`w-1 h-12 rounded-full ${
                          task.status === 'in-progress' ? 'bg-secondary' : 'bg-muted'
                        }`} />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium">{task.title}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className={`${getStatusColor(task.status)} font-mono text-xs`}>
                              {task.status === 'in-progress' ? 'В РАБОТЕ' : 'TODO'}
                            </Badge>
                            <span className="text-xs text-muted-foreground">•</span>
                            <span className="text-xs text-muted-foreground font-mono">{task.project}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={getPriorityColor(task.priority)}>
                          {task.priority === 'high' ? 'ВЫСОКИЙ' : task.priority === 'medium' ? 'СРЕДНИЙ' : 'НИЗКИЙ'}
                        </Badge>
                        <div className="text-right">
                          <p className="text-sm font-mono text-muted-foreground">
                            <Icon name="Calendar" size={14} className="inline mr-1" />
                            {new Date(task.dueDate).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'tasks' && (
            <div className="space-y-6 animate-slide-up">
              <h2 className="text-3xl font-bold">Задачи</h2>
              <Tabs defaultValue="kanban">
                <TabsList>
                  <TabsTrigger value="kanban">Канбан</TabsTrigger>
                  <TabsTrigger value="list">Список</TabsTrigger>
                </TabsList>
                <TabsContent value="kanban" className="mt-6">
                  <div className="grid grid-cols-3 gap-6">
                    {(['todo', 'in-progress', 'done'] as const).map((status) => (
                      <Card key={status} className="p-4 cyber-border">
                        <h3 className="font-semibold mb-4 flex items-center justify-between">
                          <span className="font-mono">
                            {status === 'todo' ? 'К ВЫПОЛНЕНИЮ' : status === 'in-progress' ? 'В ПРОЦЕССЕ' : 'ГОТОВО'}
                          </span>
                          <Badge variant="outline">{tasks.filter(t => t.status === status).length}</Badge>
                        </h3>
                        <div className="space-y-3">
                          {tasks.filter(t => t.status === status).map((task) => (
                            <Card key={task.id} className="p-4 cyber-border hover:neon-glow transition-all cursor-pointer">
                              <p className="font-medium mb-2">{task.title}</p>
                              <div className="flex items-center justify-between">
                                <Badge className={`${getPriorityColor(task.priority)} text-xs`}>
                                  {task.priority}
                                </Badge>
                                <span className="text-xs text-muted-foreground font-mono">{task.dueDate}</span>
                              </div>
                            </Card>
                          ))}
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}

          {['projects', 'calendar', 'analytics', 'settings'].includes(activeTab) && (
            <div className="flex items-center justify-center h-[60vh] animate-slide-up">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                  <Icon name="Construction" size={32} className="text-muted-foreground" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Раздел в разработке</h3>
                <p className="text-muted-foreground font-mono">
                  {activeTab === 'projects' && 'Управление проектами скоро будет доступно'}
                  {activeTab === 'calendar' && 'Календарь дедлайнов в процессе разработки'}
                  {activeTab === 'analytics' && 'Детальная аналитика появится в следующей версии'}
                  {activeTab === 'settings' && 'Настройки системы будут добавлены'}
                </p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Index;