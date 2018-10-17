import React, {Component} from "react";
import AceEditor from "react-ace";
import fire from "./fire";
import Dropdown from "react-dropdown";
// import brace from 'brace';
// import 'brace/mode/html'

// Importing All The Modes
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
// import 'brace/mode/text'

// Importing All The Themes
import 'brace/theme/monokai';
import 'brace/theme/github';
import 'brace/theme/tomorrow';
import 'brace/theme/kuroir';
import 'brace/theme/twilight';
import 'brace/theme/xcode';
import 'brace/theme/textmate';
import 'brace/theme/solarized_light';
import 'brace/theme/solarized_dark';
import 'brace/theme/terminal';
import 'brace/ext/language_tools';
import 'brace/ext/spellcheck';
import 'brace/ext/textarea';
//import './Docs.css';


var aceOptions = {
	// mode: "ace/mode/javascript",
	// theme: "ace/theme/monokai",

	firstLineNumber: 1,
	// Default is 1

	showLineNumbers: true,
	// Default is true

	// fontSize: 20,
	tabSize: 3,
	showPrintMargin: true,
	showGutter: true,

	// Extension Based Options:
	enableBasicAutocompletion: true,
	enableLiveAutocompletion: true,
	enableSnippets: true,
	spellcheck: true,

	// Not the Following. They are Props..??
	// focus: true,
};

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
	"css",
	// 'label' - Displayed
]

var themeOptions = [
	{value: "monokai", label: "monokai"},
	{value: "github", label: "github"},
	{value: "tomorrow", label: "tomorrow"},
	"kuroir",
	"twilight",
	"xcode",
	"textmate",
	"solarized_light",
	"solarized_dark",
	"terminal"
]

var fontOptions = [
	8, 10, 12, 14, 16, 18, 20,
]

export default class Docs extends Component {
	constructor(props) {
		super(props);
		this.state = {
			codeBlock: "",
			aceMode: "javascript",
			aceTheme: "monokai",
			aceFont: 20,
		}
	}

	componentWillMount(){
		var defaultThemeRef = fire.database().ref("/editorSettings/theme/");
		defaultThemeRef.update({
			body: "monokai"
		});

		var deaultModeRef = fire.database().ref("/editorSettings/mode/");
		deaultModeRef.update({
			body: "javascript"
		})
	}

	componentDidMount(){
		var textRef = fire.database().ref("/texts/messages/");
		textRef.on("value", (snapshot)=>{
			var newCode = snapshot.val();
			this.setState({
				codeBlock: newCode.body
			})
			// console.log(newCode.body)
		})
		var themeRef = fire.database().ref("/editorSettings/theme/");
		themeRef.on("value", (snapshot)=>{
			var newTheme = snapshot.val();
			this.setState({
				aceTheme: newTheme.body,
			})
		})
	}

	textChange(newValue){
		var textRef = fire.database().ref("/texts/messages");
		textRef.update({
			body: newValue
		});
	}

	modeChange(newMode){
		var modeRef = fire.database().ref("/editorSettings/mode/");
		modeRef.update({
			body: newMode.label
		})
	}

	themeChange(newTheme){
		var themeRef = fire.database().ref("/editorSettings/theme/");
		themeRef.update({
			body: newTheme.label
		});
	}

	fontChange(newVal){
		console.log("Current Font Size: ", newVal)
	}

	render() {
		return (
			<div>
				<div>
				<label>Mode:</label>
				<Dropdown
					options={modeOptions}
					value={this.state.aceMode}
					onChange={this.modeChange}
				/>
				<label>Theme:</label>
				<Dropdown
					options={themeOptions}
					value={this.state.aceTheme}
					onChange={this.themeChange}
				/>
				<label>Font Size:</label>
					<Dropdown
						options={fontOptions}
						value={this.state.aceFont}
						onChange={this.fontChange}
					/>
				</div>
				<div>
					<AceEditor
						mode={this.state.aceMode}
						theme={this.state.aceTheme}
						focus={true}
						fontSize={this.state.aceFont}
						setOptions={aceOptions}
						editorProps={{$blockScrolling: Infinity}}
						value={this.state.codeBlock}
						onChange={this.textChange}
					/>
				</div>
			</div>
			)
	}
}
