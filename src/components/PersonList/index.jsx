import React from 'react';
import api from '../../api/index';
import {
	Link,
  } from "react-router-dom";
//import { FlexBox, Alignment } from '@lumx/react';
//import { Avatar, Size } from '@lumx/react';
import ReactPaginate from 'react-paginate';

export default class PersonList extends React.Component {
	constructor(props){
		super(props);
		
		this.state = {
			marvelDatas:[],
			offset: 0,
			data: [],
			perPage: 20,
			currentPage: 0,
			isApiSearch:0,
		}
	}
	   
	componentDidMount() {
		this.receivedData()
	}
	
	componentDidUpdate(prevProps) {
		// Detect prop change
		if (prevProps.searchFromParent !== this.props.searchFromParent) {
			// Actions
			this.receivedData()
		}
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
		if(this.props.searchFromParent.trim() === '' || (this.props.searchFromParent.trim().length===0)){
			let isApiSearch = 0
			this.setState({ isApiSearch })
			api.getCharacters(this.state.offset, this.state.perPage).then((response)=>{
				const marvelDatas = response.data.data.results
				this.setState({
					pageCount: Math.ceil(response.data.data.total / this.state.perPage),
				})
				this.setState({ marvelDatas });
			})
			.catch((error) => {
				console.log(error)
			})
		}else{
			let isApiSearch = 1
			this.setState({ isApiSearch })
			api.getCharactersByName(this.state.offset, this.state.perPage, this.props.searchFromParent).then((response)=>{
				const marvelDatas = response.data.data.results
				this.setState({
					pageCount: Math.ceil(response.data.data.total / this.state.perPage),
				})
				this.setState({ marvelDatas });
			})
			.catch((error) => {
				console.log(error)
			})
		}
		
	}
  
	render() {
		let results
		if(this.state.marvelDatas.length === 0){
			if(this.state.isApiSearch === 1){
				results = <li className="card full"><div className="title error">Aucun résultat</div></li>
			}else{
				results = <li className="card full"><div className="title error">Chargement...</div></li>
			}
		}else{
			results = this.state.marvelDatas.map((character,i) => 
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
			)
		}
		return(
			<div className="main_container">
				<ul className="persons">
					{results}
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