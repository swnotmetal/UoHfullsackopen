import { useState, useEffect } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries';
import Select from 'react-select';

const options = () => {
    const { loading, error, data } = useQuery(ALL_AUTHORS);

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
  
    return data.allAuthors.map(author => ({
      value: author.name,
      label: author.name
    }));
  };
  

const EditAuthor = () => {
    const [name, setName] = useState('');
    const [born, setBorn] = useState('');
    const [selectedOption, setSelectedOption] = useState('');

    const [updateAuthor] = useMutation(EDIT_AUTHOR);

    const submit = async (event) => {
        event.preventDefault()

        updateAuthor({ variables: { name: name, born: parseInt(born) } })
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.error(err)
        });
        setName('')
        setBorn('')
    }

    return (
        <div>
            <form onSubmit={submit}>
                <div>
                    Name:
                    <Select
                        defaultInputValue={selectedOption}
                        onChange={option => {
                            setSelectedOption(option)
                            setName(option.value)
                        }}
                        options={options()}
                     />
                </div>
                <div>
                    Born:
                    <input value={born} onChange={({ target }) => setBorn(target.value)} />
                </div>
                <button type="submit">Update Author</button>
            </form>
        </div>
    );
}

export default EditAuthor;


