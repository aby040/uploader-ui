import { useState } from 'react';

import './Student.css';

export const Student = () => {

    const [docs, setDocs]: [{ [key: string]: FileList }, any] = useState({});
    const [response, setResponse]: [string | null, any] = useState(null);

    const students = [
        {
            id: 'std1',
            firstName: 'Student',
            lastName: 'One'
        }, {
            id: 'std2',
            firstName: 'Student',
            lastName: 'Two'
        }, {
            id: 'std3',
            firstName: 'Student',
            lastName: 'Three'
        }, {
            id: 'std4',
            firstName: 'Student',
            lastName: 'Four'
        }, {
            id: 'std5',
            firstName: 'Student',
            lastName: 'Five'
        }, {
            id: 'std6',
            firstName: 'Student',
            lastName: 'Six'
        }
    ];

    const addFiles = (evt: any, studentId: string) => {
        const updatedFiles = Object.assign(docs, { [studentId]: evt.target.files });
        setDocs(updatedFiles);
    }

    const uploadDocs = () => {
        const form = new FormData();
        console.log(docs);
        Object.entries(docs).forEach(([key, files]) => {
            console.log('AM I NUTS', key);
            for (let i = 0; i < files.length; i++) {
                form.append(key, files[i]);
            }
        });
        fetch(
            'http://localhost:8080/upload',
            {
                method: 'POST',
                body: form
            }
        ).then((data) => {
            return data.json();
        }).then((response) => {
            setResponse(response);
        })
    };

    return (
        <div className="Student">
            <table>
                <thead>
                    <tr>
                        <td>ID</td>
                        <td>First Name</td>
                        <td>Last Name</td>
                        <td>Documents</td>
                    </tr>
                </thead>
                <tbody>
                    {students.map(student => (
                        <tr key={`key-${student.id}`}>
                            <td>{student.id}</td>
                            <td>{student.firstName}</td>
                            <td>{student.lastName}</td>
                            <td>
                                <input type="file" name="{student.id}" id={student.id} multiple onChange={(e) => { addFiles(e, student.id) }} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={uploadDocs}>Upload</button>
            { response === null ? null : 
                (<pre>{JSON.stringify(response, null, 2)}</pre>)
            }
        </div>
    );
}
