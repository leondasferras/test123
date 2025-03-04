import { observer } from 'mobx-react-lite'
import taskStore from '../../stores/tasks.store'
import { Tasklist } from '../TaskList/Tasklist'

const App = observer(() => {

  return (
    <>
      <Tasklist tasks = {taskStore.tasks}/>
    </>
  )
})

export default App
