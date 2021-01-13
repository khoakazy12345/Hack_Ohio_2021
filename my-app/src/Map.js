import React from "react";
import { withGoogleMap, GoogleMap, withScriptjs, Marker} from "react-google-maps";
import MapDirectionsRenderer from './MapDirtection.js';
import './Map.css'
import LocationSearchInput from './SearchBar.js';
const { compose, withProps } = require("recompose");


const MyMapComponent = compose(
	withProps({
		googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyD3C-R7oog-Ni87FFRrE-BYQMaKhX9vLAE&v=3.exp&libraries=geometry,drawing,places",
		loadingElement: <div style={{ height: `100%` }} />,
		containerElement: <div style={{ height: `400px` }} />,
		mapElement: <div style={{ height: `100%` }} />
	}),
	withScriptjs,
	withGoogleMap)(props => (
		<GoogleMap defaultZoom={5} center={{ lat: props.latitude, lng: props.longitude }}>
			{props.markerplace.map((item) => (
      			<Marker position={{lat: item.latitude, lng: item.longitude}} />
    		))}

    		{props.searchplace.map((item)	=>	(
				<Marker position={{lat: item.latitude, lng: item.longitude}} />
			))}
			
    		{props.markerplace.length >= 2 && props.showMeThePath && (
      			<MapDirectionsRenderer places={props.markerplace} travelMode={google.maps.TravelMode.DRIVING} />
    		)}

		</GoogleMap>
	));


class ReactGoogleMaps extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			latitude: 10.8231,
			longitude: 106.6297,
			markerList: [],
			searchList: [],
			showMeThePathText: "Show Path",
			showMeThePath: false
		}
		this.handleSearchBarClick = this.handleSearchBarClick.bind(this);
		this.handleButtonClick = this.handleButtonClick.bind(this);
	}

	handleSearchBarClick = (lat, lng) =>	{
		var searchPlace = {latitude: lat, longitude: lng};
		var newSearchList = [];
		newSearchList.push(searchPlace);
		this.setState({
			latitude: lat,
			longitude: lng,
			searchList: newSearchList
		});
	}

	handleButtonClick = ()	=>	{
		var marker = {latitude: this.state.latitude, longitude: this.state.longitude};
		var newMarkerList = this.state.markerList;
		newMarkerList.push(marker);
		this.setState({
			markerList: newMarkerList
		})
		console.log(this.state.markerList);
	}

	handleShowMeThePath = () =>	{
		var newShowMeThePath = this.state.showMeThePath;
		this.setState({
			showMeThePath: !newShowMeThePath
		})
		if (this.state.showMeThePathText == "Show Path")	{
			this.setState({
				showMeThePathText: "Hide Path"
			})
		}	else	{
			this.setState({
				showMeThePathText: "Show Path"
			})
		}
	}

	render() {
		return (
			<div>
				<LocationSearchInput onClick={this.handleSearchBarClick}/>
				<MyMapComponent latitude={this.state.latitude} longitude={this.state.longitude} searchplace={this.state.searchList} 
				markerplace={this.state.markerList} showMeThePath={this.state.showMeThePath} showMeThePathText={this.state.showMeThePathText}/>
				<button onClick={this.handleButtonClick}>Add Destination</button>
				<button onClick={this.handleShowMeThePath}>{this.state.showMeThePathText}</button>
			</div>
		)
	}
}

export default ReactGoogleMaps;