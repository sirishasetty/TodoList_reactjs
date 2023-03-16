import react,{useState,useEffect,useCallback,useRef} from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import { MdEdit } from '../node_modules/react-icons/md'
import {MdDeleteForever,MdSave} from "../node_modules/react-icons/md"

const App = () => {
  // ALL use satate
  // -------------------------------------------------
  // for no.of todos in our bucket😉
  const [todos, setTodos] = useState([]);
  // for user input field
  const [userInput, setUserInput] = useState("");

  // when we click on edit icon
  const [editText, setEditText] = useState(null);
  // index of todos 
  const[todoIndex,setTodoIndex]=useState(null)
// if we click on edit for edit the present selected input
  const [editing, setEditing] = useState(false)
  
// to focuse the input field directly every time we used useref &useeffect
  const ref = useRef(null);
  useEffect(() => {
    ref.current.focus()
  }, [])

// this is for add button logic 🧠
  const addToHandler = useCallback(() => {

    const oldTodos = [...todos];
    
    if (userInput === "") {
      return;

    } else {
      const newTodo = {
        id: Math.floor(Math.random() * 100),
        text: userInput,
      };
      const newtodos = oldTodos.concat(newTodo);
      setTodos(newtodos);
    }

    setUserInput("");
  }, [todos, userInput]);

  // to delete the selected todo 🗑️
  const deleteTodoHandler=useCallback(
    (id) => {
      // first
      const oldTodos = [...todos];
      const newTodos = oldTodos.filter((todo) => todo.id !== id);
      setTodos(newTodos)
    },
    [todos],
  )
// once we click on edit button to edit the todo  this is the logic 🧠
  const editTodoHandler=useCallback(
    (index) => {
      // first
      setTodoIndex(index);
      setEditing(true)
    },
    [],
  )
  // once we click on edit button to edit the todo then 
  // user need to save for this below is the logic 👇

  const saveEditTodoHandler = useCallback(
    (id) => {
      // first
      setEditing(false);
      setTodoIndex(null);
      const oldTodos = [...todos];
      const newTodos = oldTodos.map((todo) => {
        if (todo.id === id) {
          if (editText !== "") {
            todo.text = editText;

          } else {
            return todo;
          }
        }
        return todo;
      });
      setTodos(newTodos);
    },[editText,todos]);
  
  
  
  return (
    <div className='App'>
      
      <Navbar />
      {/* This is the main div which contains overall input field to enter
      and todoList display container👇  */}
      <div className='container'>
        {/* this is for to count the no.of todos in array😮 */}
        <span className='total'>Total todos:<h3>{todos.length}👈</h3></span>
        {/* This div is for input filed and add button👇 */}
        <div className='input-container'>
          {/* inputfield */}
          <input type="text" placeholder='Enter your Todo'
         onChange={(e)=>setUserInput(e.target.value)}
            ref={ref}></input>
          {/* add button */}
          <button onClick={addToHandler}>Add</button>
        </div>
        {/* if we dont have any todos in array then this below labble will display🤗 */}
        {todos.length===0 && <h2 className='lable'>Start adding todos.........</h2>}

          {/* this div for to store the todo's */}
        <div className='todos-display-container'>
          {/*  for mapping the todos below is the logic🧠 */}
          {todos.map((todo, index) => (
            <div className='todos-list' key={todo.id}>
              {editing && todoIndex === index ?
                <div>
                  <input  className='inside-todolist' type="text" defaultValue={todo.text}
                    onChange={(e)=>setEditText(e.target.value)}
                     />
                  {/* <button onClick={()=>saveEditTodoHandler(todo.id)}>Save</button> */}
                  <MdSave onClick={()=>saveEditTodoHandler(todo.id)} />
                </div>  : <>
                  <div>
                <h4 className='input-text'>{todo.text}</h4>
              </div>
              <div >
                <MdDeleteForever className='icon' onClick={()=>deleteTodoHandler(todo.id)} />
                <MdEdit className='icon' onClick={()=>editTodoHandler(index)} />
                </div>
                </>
            }
              
                
            </div>
      
          ))}
          </div>

      </div>
      <Footer />
    </div>
  );
}

export default App;
