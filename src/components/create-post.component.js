import React, { Component } from 'react';
import ImageUploader from 'react-images-upload';

export default class CreatePost extends Component {

    constructor(props) {
        super(props);

        this.state = {
            post_title: '',
            post_description:'',
            post_image : []
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
        })
    }

    onSubmit(e){
        e.preventDefault();

        console.log('Post submitted:')
        console.log(`Title: ${this.state.post_title}`)
        console.log(`Description: ${this.state.post_description}`)
        console.log(`Image: ${this.state.post_image}`)

        this.setState({
            post_title: '',
            post_description:''
        })
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
                        <input type="submit" value="Create Todo" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}