import React from 'react';
import api from '../../api/index';
import {
	//BrowserRouter as Router,
	//Route,
	Link,
  } from 'react-router-dom';
//import { FlexBox, Alignment } from '@lumx/react';
//import { Avatar, Size } from '@lumx/react';

export default class Person extends React.Component {
	state = {
		characterDatas:[],
		marvelDatas:[],
		thumbnail:[],
		comics:[],
		params: {offset:0}
	}
	

	componentDidMount() {
		let personId = this.props.match.params.personId
		api.getCharacter(personId).then((response)=>{
			const characterDatas = response.data.data.results[0]
			const thumbnail = response.data.data.results[0].thumbnail
			const comics = response.data.data.results[0].comics.items
			this.setState({ characterDatas });
			this.setState({ thumbnail });
			this.setState({ comics });
			console.log(response.data.data.results[0])
        })
        .catch((error) => {
            console.log(error)
		})
	}

	render() {
		let character = this.state.characterDatas
		let imgPath = this.state.thumbnail.path+'.'+this.state.thumbnail.extension
		return(
			<div className="main_container">
				<div className="breadcrumb"><Link to={`/`}><i className="icon mdi mdi-chevron-left"></i> Home</Link></div>
				<div flex-container="row" flex-column="12">
					<div flex-item="8">
						<h1>{character.name}</h1>
						<div>{character.description}</div>
					</div>

					<div flex-item="4">
						<img key={character.id} alt={character.name} src={imgPath} className="img-responsive" />
						<div className="comics">
							<h2>Latest comics</h2>
							<ul>
							{this.state.comics.map((comic,i) => 
								<li key={i}>
									{comic.name}
								</li>
							)}
							</ul>
						</div>
					</div>
				</div>
			</div>
		)
	}
  }