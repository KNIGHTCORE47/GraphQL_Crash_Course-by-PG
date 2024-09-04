import React from 'react'
import { useQuery, gql } from '@apollo/client';


const GET_ALL_TODOS = gql`
      query GetAllTodos {
          getAllTodos {
            id
            userId
            completed
            title
            userInfo {
              id
              name
            }
          }
        }
`;

export default function App() {

  const { data, loading } = useQuery(GET_ALL_TODOS)
  console.log(data);
  console.log(typeof data);


  return (
    <div>
      {
        loading ?
          (<h1>Loading...</h1>)
          :
          (<div>
            <table>
              <tbody>
                {
                  data.getAllTodos.map(e => (
                    <tr key={e.id}>
                      <td>{e.title}</td>
                      <td>{e?.userInfo?.name}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>)
      }

    </div>
  )
}
