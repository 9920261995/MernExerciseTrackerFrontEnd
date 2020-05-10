import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


const Exercise = (props) =>(
    <tr>
        <td>{props.exercises.username}</td>
        <td>{props.exercises.description}</td>
        <td>{props.exercises.duration}</td>
        <td>{props.exercises.date.substring(0,10)}</td>
        <td>
            <Link to ={'/edit/'+props.exercises._id}>edit</Link> | <Link href = "#" onClick = {()=>{props.delete(props.exercises._id)}} >delete</Link>
        </td>
    </tr>
)



export default class ExerciseList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            exercises: []
        }
        this.ondeleteExercise = this.ondeleteExercise.bind(this)
    }



    componentDidMount = () => {
        axios.get("http://localhost:5000/exercise/")
            .then(res => {
                this.setState({
                    exercises: res.data
                })
            })
            .catch(err => console.log(err))
    }
    ondeleteExercise = (id) => {
        axios.delete("http://localhost:5000/exercise/" + id)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
        this.setState({
            exercises: this.state.exercises.filter(el => el._id !== id)
        })


    }
    exercisesList = () => {
        return this.state.exercises.map(current_exercise => {
            return <Exercise exercises={current_exercise} delete={this.ondeleteExercise} key={current_exercise._id} />
        })
    }

    render() {
        return (
            <div>
                <h3>Logged Exercises</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>

                    </thead>
                    <tbody>
                        {this.exercisesList()}
                    </tbody>

                </table>

            </div>
        );
    }
}