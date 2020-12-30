

let isMount = true;
let workInProgressHook = null;

const fiber = {
  stateNode: App,
  memoizedState: null
}

function useState(initialState) {
  let hook;
  if (isMount) {
    hook = {
      memoizedState: initialState,
      next: null,
      queue: {
        pendding: null
      }
    }

    if (!fiber.memoizedState) {
      fiber.memoizedState = hook
      workInProgressHook = hook
    } else {
      workInProgressHook.next = hook
    }
  } else {
    hook = workInProgressHook;
    workInProgressHook = workInProgressHook.next;
  }

  let baseState = hook.memoizedState

  if (hook.queue.pendding) {
    let firstUpdate = hook.queue.pendding.next
    do {
      const action = firstUpdate.action;
      baseState = action(baseState)
      firstUpdate = firstUpdate.next;
    } while (firstUpdate !== hook.queue.pendding.next);
    hook.queue.pendding = null

  }
  hook.memoizedState = baseState
  console.log('hook', hook)
  return [baseState, dispatchAction.bind(null, hook.queue)];
}

function dispatchAction(queue, action) {
  const update = {
    action,
    next: null
  }
  if (queue.pendding === null) {
    update.next = update
  } else {
    update.next = queue.pendding.next
    queue.pendding.next = update
  }
  queue.pendding = update
  schedule();
}

function schedule() {
  workInProgressHook = fiber.memoizedState;
  const app = fiber.stateNode()
  isMount = false
  return app
}


function App() {
  const [num, setNum] = useState(0)
  const [money, setMoney] = useState(10)
  console.log('isMount', isMount)
  console.log('num', num)
  console.log('money', money)
  return {
    onclick() {
      setNum(num => num + 1)
    },
    onfocus() {
      setMoney(num => num + 10)
    }
  }
}

window.app = schedule()