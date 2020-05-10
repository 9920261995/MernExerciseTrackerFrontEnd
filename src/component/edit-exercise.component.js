import React from 'react'
import DatePicker from 'react-datepicker'
import axios from 'axios'
import 'react-datepicker/dist/react-datepicker.css'

export default class CreateExercise extends React.Component {
    constructor(props) {
        super(props)
        this.onChangeDate = this.onChangeDate.bind(this)
        this.onChangeUsername = this.onChangeUsername.bind(this)
        this.onChangeDuration = this.onChangeDuration.bind(this)
        this.onChangeDescription = this.onChangeDescription.bind(this)


        this.state = {
            username: "",
            description: "",
            duration: "",
            date: new Date(),
            users: []
        }
    }

    componentDidMount = () => {
        axios.get("http://localhost:5000/exercise/" + this.props.match.params.id)
            .then(res => {
                this.setState({
                    username: res.data.username,
                    description: res.data.description,
                    duration: res.data.duration,
                    date:new Date (res.data.date),
                })
            })
            .catch(err => console.log(err))
        axios.get("http://localhost:5000/users/")
            .then(res => {
                if (res.data.length > 0) {
                    this.setState({
                        users: res.data.map(user => user.username),
                    })

                }
            })
            .catch(err => console.log(err))


    }

    onChangeUsername = (e) => {
        this.setState({ username: e.target.value })
    }
    onChangeDescription = (e) => {
        this.setState({ description: e.target.value })
    }
    onChangeDuration = (e) => {
        this.setState({ duration: e.target.value })
    }
    onChangeDate = (date) => {
        this.setState({ date: date })
    }

    onSubmit = (e) => {
        e.preventDefault();
        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: new Date (this.state.date),
        }

        axios.post("http://localhost:5000/exercise/update/" + this.props.match.params.id, exercise)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))

        console.log(exercise)
        window.location = ' /'
    }


    render() {
        return (
            <div>
                <h3>Update New Exericse Log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <select ref="userInput"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                        >
                            {
                                this.state.users.map(user => {
                                    return <option
                                        key={user}
                                        value={user}>{user}
                                    </option>
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>
                            Description:
                        </label>
                        <input
                            className="form-control"
                            required
                            type="text"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                        />
                    </div>
                    <div className="form-group">
                        <label>
                            Duration (in minutes) :
                        </label>
                        <input
                            className="form-control"
                            required
                            type="text"
                            value={this.state.duration}
                            onChange={this.onChangeDuration}
                        />
                    </div>
                    <div className="form-group">
                        <label>
                            Date:
                        </label>
                        <DatePicker
                            selected={this.state.date}
                            onChange={this.onChangeDate}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Edit Excercise Log" className="btn-btn-primary" />

                    </div>
                </form>
            </div>
        );
    }
}