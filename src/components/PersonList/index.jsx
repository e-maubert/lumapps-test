import React from 'react';
import api from '../../api/index';
import {
	//BrowserRouter as Router,
	//Switch,
	//Route,
	Link,
  } from "react-router-dom";
//import { FlexBox, Alignment } from '@lumx/react';
//import { Avatar, Size } from '@lumx/react';
//import Person from '../Person';
import ReactPaginate from 'react-paginate';

export default class PersonList extends React.Component {
	state = {
		marvelDatas:[],
		offset: 0,
		data: [],
		perPage: 20,
		currentPage: 0
	}

	componentDidMount() {
		this.receivedData()
	}

	getImage(i) {
		let character = this.state.marvelDatas[i]
		let imgPath = character.thumbnail.path+'.'+character.thumbnail.extension
		return <img key={character.id} alt={character.name} src={imgPath} className="img-responsive" />
	}

	handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.receivedData()
        });
	};
	
	receivedData() {
		api.getCharacters(this.state.offset, this.state.perPage).then((response)=>{
			const marvelDatas = response.data.data.results
			this.setState({
				pageCount: Math.ceil(response.data.data.total / this.state.perPage),
			})
			this.setState({ marvelDatas });
			
			console.log(response.data)
        })
        .catch((error) => {
            console.log(error)
        })
    }

  
	render() {
		return(
			<div className="main_container">
				<ul className="persons">
					{this.state.marvelDatas.map((character,i) => 
						<li key={i} className="card">
							<Link to={`/person/${character.id}`}>
								{this.getImage(i)}
								<div className="description">
									{character.description}
									<i className="icon mdi mdi-chevron-right"></i>
								</div>
								<div className="title">{character.name}</div>
							</Link>
						</li>
					)}
				</ul>
				<ReactPaginate
                    previousLabel={" "}
                    nextLabel={" "}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>
			</div>
		)
	}
  }