"use client"

import { useState } from "react"
import { Edit, Plus, Search, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

// Sample notes data
const initialNotes = [
  {
    id: "1",
    title: "Project ideas for Q3",
    content: "1. Mobile app redesign\n2. New landing page\n3. Customer feedback system\n4. Analytics dashboard",
    category: "work",
    createdAt: "2025-06-22T10:30:00",
  },
  {
    id: "2",
    title: "Meeting notes from yesterday",
    content:
      "- Team agreed on new sprint schedule\n- Need to follow up with design team\n- Project deadline extended by 2 weeks\n- New requirements added to backlog",
    category: "work",
    createdAt: "2025-06-21T15:45:00",
  },
  {
    id: "3",
    title: "Shopping list for weekend",
    content: "- Groceries\n- New desk lamp\n- Phone charger\n- Birthday gift for mom",
    category: "personal",
    createdAt: "2025-06-20T18:20:00",
  },
  {
    id: "4",
    title: "Workout routine",
    content:
      "Monday: Upper body\nTuesday: Cardio\nWednesday: Lower body\nThursday: Rest\nFriday: Full body\nWeekend: Outdoor activities",
    category: "health",
    createdAt: "2025-06-19T08:15:00",
  },
  {
    id: "5",
    title: "Book recommendations",
    content:
      "1. Atomic Habits by James Clear\n2. Deep Work by Cal Newport\n3. The Psychology of Money by Morgan Housel\n4. Project Hail Mary by Andy Weir",
    category: "personal",
    createdAt: "2025-06-18T21:10:00",
  },
  {
    id: "6",
    title: "Travel plans for summer",
    content:
      "- Check flights to Barcelona\n- Book accommodations\n- Research local attractions\n- Make restaurant reservations\n- Prepare packing list",
    category: "personal",
    createdAt: "2025-06-17T14:25:00",
  },
  {
    id: "7",
    title: "Home improvement ideas",
    content:
      "- Paint living room\n- Replace kitchen faucet\n- Fix bathroom cabinet\n- Install new light fixtures\n- Organize garage",
    category: "personal",
    createdAt: "2025-06-16T11:40:00",
  },
  {
    id: "8",
    title: "Goals for next quarter",
    content:
      "1. Complete certification\n2. Improve time management\n3. Read at least 3 books\n4. Start side project\n5. Exercise 3x per week",
    category: "personal",
    createdAt: "2025-06-15T09:55:00",
  },
]

export function NotesView() {
  const [notes, setNotes] = useState(initialNotes)
  const [newNote, setNewNote] = useState({
    title: "",
    content: "",
    category: "personal",
  })
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const handleAddNote = () => {
    const note = {
      id: Date.now().toString(),
      ...newNote,
      createdAt: new Date().toISOString(),
    }
    setNotes([note, ...notes])
    setNewNote({
      title: "",
      content: "",
      category: "personal",
    })
    setIsDialogOpen(false)
  }

  const deleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id))
  }

  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = categoryFilter === "all" || note.category === categoryFilter

    return matchesSearch && matchesCategory
  })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString() + " at " + date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Notes</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Note
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Note</DialogTitle>
              <DialogDescription>Create a new note to save your thoughts and ideas.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newNote.title}
                  onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                  placeholder="Note title"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={newNote.content}
                  onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                  placeholder="Note content"
                  className="min-h-[200px]"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select value={newNote.category} onValueChange={(value) => setNewNote({ ...newNote, category: value })}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="work">Work</SelectItem>
                    <SelectItem value="personal">Personal</SelectItem>
                    <SelectItem value="health">Health</SelectItem>
                    <SelectItem value="ideas">Ideas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddNote}>Add Note</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search notes..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="work">Work</SelectItem>
            <SelectItem value="personal">Personal</SelectItem>
            <SelectItem value="health">Health</SelectItem>
            <SelectItem value="ideas">Ideas</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredNotes.map((note) => (
          <Card key={note.id}>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <CardTitle className="text-base">{note.title}</CardTitle>
                <div className="rounded-full bg-muted px-2 py-1 text-xs capitalize">{note.category}</div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-line text-sm text-muted-foreground">{note.content}</p>
            </CardContent>
            <CardFooter className="flex items-center justify-between border-t pt-4">
              <div className="text-xs text-muted-foreground">{formatDate(note.createdAt)}</div>
              <div className="flex space-x-2">
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => deleteNote(note.id)}>
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
