import { useMutation, useQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import './App.css';
import { CREATE_USER } from './mutation/user';
import { GET_ALL_USERS, GET_USER_BY_ID } from './services/user';

function App() {
  const { data: allUsersData, loading, error, refetch } = useQuery(GET_ALL_USERS)
  const { data: singleUserData } = useQuery(GET_USER_BY_ID,)
  const [newUser] = useMutation(CREATE_USER)

  const [users, setUsers] = React.useState([]);

  const [username, setUsername] = React.useState('')
  const [age, setAge] = React.useState('')


  console.log(username, age)
  useEffect(() => {
    if (!loading && !error) {
      setUsers(allUsersData.getAllUsers)
    }
  }, [allUsersData])


  const addUser = (e) => {
    e.preventDefault()
    newUser({
      variables: {
        input: {
          username, age
        }
      }
    }).then(({ data }) => {
      console.log(data)
      setUsername('');
      setAge('');
    })
  }

  const getAll = (e) => {
    e.preventDefault()
    refetch();
  }

  if (loading) {
    return <p>Идет загрузка данных...</p>
  }
  if (error) {
    return <p>Идет загрузка данных...</p>
  }

  return (
    <div className="App">
      <form>
        <input placeholder='username' type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input placeholder='age' type='number' value={age} onChange={(e) => setAge(e.target.value)} />
        <div className='btn'>
          <button onClick={(e) => addUser(e)}>Создать пользователя</button>
          <button onClick={(e) => getAll(e)}>Получить пользователей</button>
        </div>
      </form>
      <div>
        {users.map((user, id) => (
          <p key={id} className='user' > {user.username}({user.age})</p>
        ))}
      </div>
    </div >
  );
}

export default App;
