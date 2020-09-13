var watch_id;
var mapzoom = -1;
var timerstamp = 0;
var timer1 = 0;
var followgps = 0;
var gps_marker;
var gps_pos = {};

var img_20;
var img_21;
var img_22;
var img_100;
var img_102;
var img_103;
init();

function init(){
	//console.log(Params);
	headertext.innerHTML = 'Карта';
	
	btn = CreateHeaderBtn('menubtn1', 'gps_fixed');
	btn.addEventListener('click', materializeEffect);
	btn.style['color']='#900';
	followgps = 1;
	btn.addEventListener('click', function(){
		if(followgps==0){
			menubtn1.style['color']='#900';
			followgps=3;
		}
		if(followgps==1){
			menubtn1.style['color']='';
			followgps=2;
		}
		followgps=followgps-2;
	});

	btn = CreateHeaderBtn('menubtn2', 'library_add');
	btn.addEventListener('click', materializeEffect);
	btn.addEventListener('click', add_fld);

	frmdata.innerHTML = '<div id=speeddiv style="font-size:14px;position:absolute; right:5px; top:5px; background-color:#00DD0055;z-index:1100;border-radius:4px;box-shadow: 1px 1px 5px 0px rgba(0,0,0,0.5), inset -1px -1px 5px 0px rgba(0,0,0,0.5);padding:3px">'+
							'<table>'+
							'<tr><td>Скорость:<td id=speedtext></tr>'+
							'</table></div>'+
							'<div style="font-size:14px;position:absolute; left:0px; top:0px;bottom:0px; width:30px;z-index:500;"></div>'+
							'<div style="font-size:14px;position:absolute; right:0px; top:0px;bottom:0px; width:30px;z-index:500;"></div>'+
							'<div id=mapdiv style="width:100%;height:100%;" align=center></div>'+
							'';

	window_resize = function(){
		get_map.invalidateSize();
	}
	
	get_map = L.map('mapdiv', {
							editable : true, 
							attributionControl : false,
//							trackResize : false,
							doubleClickZoom :false,
							zoomSnap : 0.25,
							zoomDelta: 0.25,
//							zoomAnimation: false,
							useCache : true,
							crossOrigin: true,
							cacheMaxAge : 4*7*24*60*60*1000
						}).setView([62.2, 94.1], 3);

	//get_map.addLayer(L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {updateInterval:10, updateWhenIdle : false, maxZoom: 20, useCache: true,crossOrigin: true, cacheMaxAge: 365*24*3600*1000, attribution: ''}));
	//get_map.addLayer(L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {updateInterval:10, updateWhenIdle : false, maxZoom: 20, useCache: true,crossOrigin: true, cacheMaxAge: 365*24*3600*1000, attribution: '', tileSize: 512,zoomOffset: -1}));
	get_map.addLayer(L.tileLayer('http://127.0.0.1:8080/map?mapkey=1&z={z}&x={x}&y={y}&osmp=1&t=3', {updateInterval:10, updateWhenIdle : false, maxZoom: 20, useCache: true,crossOrigin: true, cacheMaxAge: 365*24*3600*1000, attribution: ''}));
	//get_map.addLayer(L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {updateInterval:10, updateWhenIdle : false, maxZoom: 20, useCache: true,crossOrigin: true, cacheMaxAge: 365*24*3600*1000, attribution: ''}));
	
	//https://khms1.googleapis.com/kh?v=860&hl=ru&gl=RU&x=158647&y=81603&z=18
	//https://tile.openstreetmap.org/18/158645/81600.png	

	//https://leafletjs.com/reference-1.6.0.html#map-zoomend
	get_map.on('zoom__', function(){
		gps_marker._icon.style['transition'] = '';
		console.log('zoom');
		UpdateGPSMarker();
	});
	get_map.on('zoomend__', function(){
		gps_marker._icon.style['transition'] = '';
		UpdateGPSMarker();
	});
	get_map.on('zoomstart__', function(){
		gps_marker._icon.style['transition'] = '';
		UpdateGPSMarker();
	});

/*
	var greenIcon = L.icon({
		iconUrl: './img/curs.png',
		//shadowUrl: 'leaf-shadow.png',

		iconSize:     [15, 15], // size of the icon
		//shadowSize:   [50, 64], // size of the shadow
		iconAnchor:   [8, 8], // point of the icon which will correspond to marker's location
		//shadowAnchor: [4, 62],  // the same for the shadow
		//popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
	});	
*/
	var CarPos = L.icon({
		iconUrl: './img/car.png',
		iconSize:     [21, 46], // size of the icon
		iconAnchor:   [11, 23], // point of the icon which will correspond to marker's location
	});	

	img_20 = L.icon({
		iconUrl: './img/img_20.png',
		iconSize:     [28, 39], // size of the icon
		iconAnchor:   [15, 20], // point of the icon which will correspond to marker's location
	});	
	img_21 = L.icon({
		iconUrl: './img/img_21.png',
		iconSize:     [28, 25], // size of the icon
		iconAnchor:   [15, 13], // point of the icon which will correspond to marker's location
	});
	img_22 = L.icon({
		iconUrl: './img/img_22.png',
		iconSize:     [28, 25], // size of the icon
		iconAnchor:   [15, 13], // point of the icon which will correspond to marker's location
	});	
	img_100 = L.icon({
		iconUrl: './img/img_100.png',
		iconSize:     [70, 25], // size of the icon
		iconAnchor:   [35, 13], // point of the icon which will correspond to marker's location
	});	
	img_102 = L.icon({
		iconUrl: './img/img_102.png',
		iconSize:     [25, 25], // size of the icon
		iconAnchor:   [13, 13], // point of the icon which will correspond to marker's location
	});	
	img_103 = L.icon({
		iconUrl: './img/img_103.png',
		iconSize:     [29, 25], // size of the icon
		iconAnchor:   [15, 13], // point of the icon which will correspond to marker's location
	});	

	gps_marker = L.marker([0, 0], {icon: CarPos, zIndexOffset: 50}).addTo(get_map);
	gps_marker._icon.style['transform-origin'] = '50% 50%';
	
	gps_marker.bindPopup('GPS');
	
	var latlngs =[];

	var polygon;

    latlngs =   [
	
						[
							57.688476,
							55.512178
						],
						[
							57.685963,
							55.522134
						],
						[
							57.685228,
							55.521448
						],
						[
							57.687695,
							55.511727
						],
						[
							57.688476,
							55.512178
						]]
	var polygon = L.polygon(latlngs, {color: 'red'}).addTo(get_map);
	
				var mapzoom = 10;
				get_map.flyTo(latlngs[0], mapzoom, {animate:false});
				
	var imageUrl = './data/fld.png';
	var imageBounds = [[57.688476, 55.522134], [57.687695, 55.512178]];
	L.imageOverlay(imageUrl, imageBounds).addTo(get_map);	
/*
		setTimeout(function(){
				//get_map.panTo([56.4356078302148,57.1774116424068], 15, {animate:true});
				var mapzoom = 10;
				get_map.flyTo([56.4356078302148,57.1774116424068], mapzoom, {animate:false});
		}, 1000);
	*/
}
	
function unloadform(){
	clearInterval(timer1);
	navigator.geolocation.clearWatch(watch_id);
	ClearHeaderBtn();
}

function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}

function geoGetPos(position){
	console.log(position);
	
	gps_pos.timestamp = position.timestamp;
	gps_pos.latitude = position.coords.latitude;
	gps_pos.longitude = position.coords.longitude;
	gps_pos.altitude = position.coords.altitude;
	gps_pos.accuracy = position.coords.accuracy;
	gps_pos.altitudeAccuracy = position.coords.altitudeAccuracy;
	gps_pos.heading = position.coords.heading;
	gps_pos.speed = position.coords.speed;	
	
	var lat = position.coords.latitude;
	var lon = position.coords.longitude;
	
	if(mapzoom==-1){
		mapzoom = 16.5;
		get_map.flyTo([lat, lon], mapzoom, {animate:false});
	}
	
	if(followgps==1){
		get_map.panTo([lat, lon], get_map._zoom, {animate:true});
		//get_map.flyTo([lat, lon], get_map._zoom, {animate:true});
	}
	

	timerstamp = 0;
	
	UpdateGPSMarker();	
}

function UpdateGPSMarker(){
	
}


function add_fld()
{
		var EditPol = L.polygon([
									[get_map.getCenter().lat-0.005,get_map.getCenter().lng-0.01],
									[get_map.getCenter().lat-0.005,get_map.getCenter().lng+0.01],
									[get_map.getCenter().lat+0.005,get_map.getCenter().lng+0.01],
									[get_map.getCenter().lat+0.005,get_map.getCenter().lng-0.01]
								],{color:"#73EA8D",fillColor:"#738DEA",weight:4,dashArray:[15, 5, 1, 5]})
								.bindTooltip('Новое поле', {permanent: true, direction:"center"})
								.addTo(get_map)
								.on('click dblclick', function(){})

								.on('editable:drawing:move', function(e) {
																e.target.closeTooltip();
																e.target.openTooltip();
															})
								.on('editable:vertex:mousedown', function(e){
																e.target.closeTooltip();
																e.target.openTooltip();
																for(var i=0; i<e.target._latlngs["0"].length; i++) e.target._latlngs["0"][i].__vertex._icon.classList.remove('leaflet-vertex-icon-active');
																e.vertex._icon.classList.add('leaflet-vertex-icon-active');
																//active_fld_vert = e;
																//field_select(e.target);
								})
								.on('editable:vertex:rawclick', function(e) {
																e.target.closeTooltip();
																e.target.openTooltip();
																for(var i=0; i<e.target._latlngs["0"].length; i++) e.target._latlngs["0"][i].__vertex._icon.classList.remove('leaflet-vertex-icon-active');
																e.vertex._icon.classList.add('leaflet-vertex-icon-active');
																//active_fld_vert = e;
																//field_select(e.target);
								})
								.enableEdit();
	
}