import React, { Component } from "react";
import './Write.scss';
import { connect } from "react-redux";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

import * as postService from '../services/postService';
import { withRouter } from 'react-router-dom';
import { convertBufferImageToBase64 } from "../utils";

class Write extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            value: '',
            options: [
                { id: 1, label: 'art', value: 'C1' },
                { id: 2, label: 'cinema', value: 'C2' },
                { id: 3, label: 'design', value: 'C3' },
                { id: 4, label: 'technology', value: 'C4' },
                { id: 5, label: 'food', value: 'C5' },
            ],
            isSelectedCat: '',
            previewImgURL: '',
            imgUrl: '',
            isOpenPreview: false,
            action: 'POST'
        }
    }

    componentDidMount() {
        const state = this.props.location.state;
        if (state) {
            this.setState({
                title: state.title,
                value: state.desc,
                isSelectedCat: state.categoryId,
                userId: state.userId,
                action: 'EDIT',
                imgUrl: state.image,
                previewImgURL: state.image,
                id: state.id
            })
        }
    }
    
    handleOnChangeReactQuill = (e) => {
        this.setState({
            value: e
        })
    }
    handleOnChangeTitle = (e) => {
        this.setState({
            title: e.target.value
        })
    }
    handleOnChangeSelect = (e) => {
        this.setState({
            isSelectedCat: e.target.value
        })
    }
    toBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        })
    }
    handleOnChangeUploadImage = async (e) => {
        let datafiles = e.target.files;
        // console.log('datafiles', datafiles)
        let file = datafiles[ 0 ];
        // console.log('datafile', file)
        // let reader = new FileReader();
        // let baseString = '';
        // reader.onloadend = function () {
        //     baseString = reader.result;
        // }
        // reader.readAsDataURL(file);
        // setTimeout(() => {
        //     console.log('')
        //     console.log('base 64: ', baseString);
        //     this.setState({
        //         previewImgURL: baseString
        //     })
        // }, 1000)
        if (file) {
            let objectUrl = URL.createObjectURL(file);
            let base64 = await this.toBase64(file);
            // console.log('Check base64 image: ', base64)
            this.setState({
                previewImgURL: base64,
                imgUrl: objectUrl
            })
        }
        
    }
    handleOpenPreview = () => {
        if (this.state.previewImgURL === '') return;
        this.setState({
            isOpenPreview: !this.state.isOpenPreview
        })
    }
    handleClear = () => {
        this.setState({
            previewImgURL: '',
            imgUrl: ''
        })
    }


    handleSubmit = async () => {
        if (this.state.action === 'POST') {
            const postData = {
                userId: this.props.user.id,
                title: this.state.title,
                description: this.state.value,
                image: this.state.previewImgURL,
                categoryId: this.state.isSelectedCat
            }
            const response = await postService.postSinglePost(postData);
            if (response && response.status === 'OK') {
                alert(response.message);
                this.props.history.push('/');
            } else if (response && response.status === 'ERR') {
                alert(response.message);
            }
        } else if (this.state.action === 'EDIT') {
            const editData = {
                userId: this.props.user.id,
                title: this.state.title,
                description: this.state.value,
                image: this.state.previewImgURL,
                categoryId: this.state.isSelectedCat,
                id: this.state.id // Note: nhận được ở didMount
            }
            const response = await postService.editSinglePost(editData);
            if (response && response.status === 'OK') {
                alert(response.message);
            } else if (response && response.status === 'ERR') {
                alert(response.message);
            }
        }
    }
    render() {
        const options = this.state.options && this.state.options.length > 0 ? this.state.options : [];
        return (
            <div className="write-container">
                <div className="write-content">
                    <div className="write-title">
                        <input type="text" value={this.state.title} onChange={(e) => this.handleOnChangeTitle(e)}/>
                    </div>
                    <div className="write-description">
                        <ReactQuill className="write-quill" theme="snow" value={this.state.value} onChange={(e) => this.handleOnChangeReactQuill(e)}/>
                    </div>
                    <button type="button" onClick={() => this.handleSubmit()}>
                        {this.state.action === 'EDIT' ? 'Update' : 'Publish'}
                    </button> 
                </div>
                <div className="write-action">
                    <div className="action-child upload-image">
                        <input type="file" id="upload-file" onChange={(e) => this.handleOnChangeUploadImage(e)} hidden/>
                        <label className="upload-file" htmlFor="upload-file" onClick={() => this.handleClear()}>
                            <span>Upload image</span>
                            <i className="fa-solid fa-arrow-up-from-bracket icon-upload"></i>
                        </label>
                        <div className="image-preview" style={{backgroundImage: `url(${this.state.imgUrl})`}} onClick={() => this.handleOpenPreview()}>
                            
                        </div>
                    </div>
                    <div className="action-child select-category">
                        <div className="category-header">
                            <span>Category</span>
                        </div>
                        <div className="category-select">
                            {
                                options.map((option) => (
                                    <div className="category" key={option.id}>
                                        <input type="radio" value={option.value} id={option.label} onChange={(e) => this.handleOnChangeSelect(e)} checked={ this.state.isSelectedCat === option.value } />
                                        <label htmlFor={option.label}>{option.label}</label>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                {
                    this.state.isOpenPreview && (
                        <Lightbox
                            mainSrc={this.state.previewImgURL}
                            onCloseRequest={() => this.setState({ isOpenPreview: false })}
                        />
                    )
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user
});
const mapDispatchToProps = (dispatch) => ({

});
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Write));