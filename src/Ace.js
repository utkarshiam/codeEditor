import React, { Component } from 'react';
import brace from 'brace';
import AceEditor from 'react-ace';
import fire from './fire';
import 'brace/ext/language_tools';
import Dropdown from "react-dropdown";
import 'brace/mode/javascript';
import 'brace/mode/java';
import 'brace/mode/python';
import 'brace/mode/xml';
import 'brace/mode/ruby';
import 'brace/mode/sass';
import 'brace/mode/markdown';
import 'brace/mode/mysql';
import 'brace/mode/json';
import 'brace/mode/html';
import 'brace/mode/handlebars';
import 'brace/mode/golang';
import 'brace/mode/csharp';
import 'brace/mode/elixir';
import 'brace/mode/typescript';
import 'brace/mode/css';
import 'brace/theme/github';

var database =fire.database();


var modeOptions = [
	{value: "javascript", label: "javascript"},
	{value: "java", label: "java"},
	{value: "python", label: "python"},
	"xml",
	"ruby",
	"sass",
	"markdown",
	"mysql",
	"json",
	"html",
	"handlebars",
	"golang",
	"csharp",
	"elixir",
	"typescript",
	"css"
	// 'label' - Displayed
]



//var userNum=0;
class Ace extends Component {

  constructor(props,context){ //Construction of a constructor to Initialize the values
      super(props,context);  //To get data from parent class
      this.state={
              code: "",
              aceMode: "javascript"

              //newValue="startcode"
      }
      this.onChange = this.onChange.bind(this);
      }

			modeChange(newMode){
				var modeRef = fire.database().ref("value");
				modeRef.update({
					body1: newMode.label
				})
			}

      onChange(xValue) {
        var x= this;
        var y=xValue;
        database.ref('value').update({
          body: y,
          //author:'Utkarsh'
        })
      }

//   userNumber(){
// 	var myConnectionsRef = database.ref('users/joe/connections');
// 	var lastOnlineRef = database.ref('users/joe/lastOnline');
// 	var connectedRef = database.ref('.info/connected');
// connectedRef.on('value', function(snap) {
// 		if (snap.val() === true)
// 			{
// 	 				var con = myConnectionsRef.push();
// 					userNum+=1;
// 			}
//
// 		else if(con.onDisconnect())
// 			{
// 					con.remove();
// 					userNum-=1;
// 			}
// })
// return userNum;
// }

  componentDidMount(){
		//console.log(userNum);
		//userNumber();
			var _this= this; // did this instead of binding to make thisngs less messy or we can simply add this.bind
      database.ref('value').on('value', function(snapshot){ // Snapshot just a name of a variable and emember database.ref().on('',function)
        var msg=snapshot.val();  //.val() is a function which will give us a value of the parameter passed

        _this.setState({
          code: msg.body
        })

      })
			var modeRef = fire.database().ref("value");
			modeRef.on("value", (snapshot)=>{
				var newMode = snapshot.val();
				_this.setState({
					aceMode: newMode.body1,
				})
			})


  }


	render() {
    return (
      <div>
      <h2>Coding Environment </h2>

      <div>
      <label><h3>Mode:</h3></label>
      <Dropdown
        options={modeOptions}
        value={this.state.aceMode}
        onChange={this.modeChange}/>
				</div>
      <br/>
      <br/>

        <AceEditor

    mode={this.state.aceMode}
    theme="github"
    onChange={this.onChange}
    value={this.state.code}
    name="editor"
    editorProps={{$blockScrolling: true}}/>
  </div>
);
}
}
export default Ace;
