import { useEffect, useState } from "react"
import { LOGIN } from "../queries"
import { useMutation } from "@apollo/client"


const LoginForm = ({ setrError, setToken }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [login, result ] = useMutation(LOGIN, {
        onError: (error) => {
            setrError(error,GraphQLErrors[0].message)
        }
    })

    useEffect(() => {
        if( result.data ) {
            const token = result.data.login.value
            setToken(token)
            localStorage.setItem('user-token', token)
        }
    }, [result.data])

    const submit = async(event) => {
        event.preventDefault()

        login({ variables: {username, password}})
    }

    return (
        <div>
            <form onSubmit={submit}>
            <div>
                username <input 
                value={username}
                onChange={ ({target}) => setUsername(target.value)}
                />
            </div>
            <div>
                password <input
                type='password' 
                value={password}
                onChange={ ({target}) => setPassword(target.value)}
                />
            </div>
            <button type="submit">login</button>
            </form>
        </div>
    )
}

export default LoginForm