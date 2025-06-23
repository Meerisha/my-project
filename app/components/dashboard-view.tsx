import { useState } from "react"
import { Calendar, Clock, FileText, Settings, User } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { CalendarView } from "./calendar-view"
import { NotesView } from "./notes-view"
import { SettingsView } from "./settings-view"
import { TasksView } from "./tasks-view"

export function DashboardView() {
  const [activeTab, setActiveTab] = useState("tasks")

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Clock className="h-6 w-6" />
          <span className="text-lg font-semibold">Personal Assistant</span>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <Button variant="outline" size="sm" className="hidden md:flex">
            <User className="mr-2 h-4 w-4" />
            Profile
          </Button>
          <Button variant="outline" size="sm" className="hidden md:flex">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
          <Button size="sm">Add New Task</Button>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
          <Card className="md:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tasks Overview</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12 Tasks</div>
              <p className="text-xs text-muted-foreground">3 due today, 5 upcoming</p>
              <div className="mt-4 h-1 w-full rounded-full bg-muted">
                <div className="h-1 w-1/2 rounded-full bg-primary" />
              </div>
              <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                <p>50% Complete</p>
                <p>6/12 Tasks</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today&apos;s Schedule</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3 Events</div>
              <p className="text-xs text-muted-foreground">Next: Meeting at 2:00 PM</p>
              <div className="mt-4 space-y-2">
                <div className="flex items-center">
                  <div className="mr-2 h-2 w-2 rounded-full bg-red-500" />
                  <span className="text-xs">2:00 PM - Team Meeting</span>
                </div>
                <div className="flex items-center">
                  <div className="mr-2 h-2 w-2 rounded-full bg-blue-500" />
                  <span className="text-xs">4:30 PM - Project Review</span>
                </div>
                <div className="flex items-center">
                  <div className="mr-2 h-2 w-2 rounded-full bg-green-500" />
                  <span className="text-xs">6:00 PM - Dinner with Client</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Recent Notes</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8 Notes</div>
              <p className="text-xs text-muted-foreground">Last updated: 2 hours ago</p>
              <div className="mt-4 space-y-2">
                <div className="truncate text-sm">Project ideas for Q3</div>
                <div className="truncate text-sm">Meeting notes from yesterday</div>
                <div className="truncate text-sm">Shopping list for weekend</div>
              </div>
            </CardContent>
          </Card>
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="tasks" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span className={cn("hidden sm:inline-block")}>Tasks</span>
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span className={cn("hidden sm:inline-block")}>Calendar</span>
            </TabsTrigger>
            <TabsTrigger value="notes" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span className={cn("hidden sm:inline-block")}>Notes</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span className={cn("hidden sm:inline-block")}>Settings</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="tasks" className="space-y-4">
            <TasksView />
          </TabsContent>
          <TabsContent value="calendar" className="space-y-4">
            <CalendarView />
          </TabsContent>
          <TabsContent value="notes" className="space-y-4">
            <NotesView />
          </TabsContent>
          <TabsContent value="settings" className="space-y-4">
            <SettingsView />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
