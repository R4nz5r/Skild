import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: App })

function App() {
 return(
  <main>
    <h1>Welcome to TanStack Start</h1>
  </main>
 )
}
