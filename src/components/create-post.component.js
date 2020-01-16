import React, { Component } from 'react';
import ImageUploader from 'react-images-upload';
import axios from 'axios';
import {storage} from '../firebase-config'

export default class CreatePost extends Component {

    constructor(props) {
        super(props);

        this.state = {
            post_title: '',
            post_description:'',
            post_image: []
        };


        this.onChangePostDescription = this.onChangePostDescription.bind(this)
        this.onChangePostTitle = this.onChangePostTitle.bind(this)
        this.onDrop = this.onDrop.bind(this)
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangePostTitle(e) {

        this.setState({
            post_title: e.target.value
        })
    }

     onChangePostDescription(e) {
        this.setState({
            post_description: e.target.value
        })
    }

    onDrop(picture) {
        console.log("loading picture")
        this.setState({
            post_image: this.state.post_image.concat(picture)
        });
        
        console.log(this.state.post_image)
    }

    onSubmit(e){
        e.preventDefault();

        const uploadTask = storage.ref(`images/${this.state.post_title}`).put(this.state.post_image)
        uploadTask.on(
            "state_changed",
            error => {
                console.log(error)
            },
            () => {
                storage
                    .ref("images")
                    .child(this.state.post_title)
                    .getDownloadURL()
                    .then(url => {
                         const newPost = {
                            post_title: this.state.post_title,
                            post_description: this.state.post_description,
                            post_image_url: url
                        }
                        axios.post('http://localhost:4000/posts/upload', newPost)
                            .then(res => console.log(res.data))
                    })
                
                

                console.log('Post submitted:')
                console.log(`Title: ${this.state.post_title}`)
                console.log(`Description: ${this.state.post_description}`)
                console.log(`Image: ${this.state.post_image}`)


                this.setState({
                    post_title: '',
                    post_description: '',
                    post_image: []
                })
            }
        )
    }

    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Create Post</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Title: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.post_title}
                                onChange={this.onChangePostTitle}
                                />
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.post_description}
                                onChange={this.onChangePostDescription}
                                />
                    </div>
                    <div className="form-group">
                        <label>Image Upload: </label>
                         <ImageUploader
                            buttonText='Choose images'
                            onChange={this.onDrop}
                            imgExtension={['.jpg', '.gif', '.png', '.gif']}
                            maxFileSize={5242880}
                            withPreview={true}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Post" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}