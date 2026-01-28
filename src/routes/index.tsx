

import { createFileRoute } from '@tanstack/react-router'
import TodoApp from '../lib/components/TodoApp'
export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <TodoApp />
  )
}
