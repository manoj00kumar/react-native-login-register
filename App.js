/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet,AsyncStorage, Text,TextInput,Button, View,Image,Alert} from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
class Greeting extends Component {
  render() {
    return (
      <View style={styles.header}>
        <Text style={styles.headertext}>Hello {this.props.name}</Text>
        <Image style={styles.logo} source={require('./img/logo.png')} />
      </View>
    );
  }
}

class Register extends Component{
	static navigationOptions =
   {
      title: 'Register',
    
   };

   constructor(props){
		super(props);
		this.state={name:'',password:'',email:''};
	
	}

	render(){
		return (
      <View style={styles.section}>
       
        <View style={styles.form}>
        <Text>{this.state.msg}</Text>
        <TextInput style={styles.inp} value={this.state.name} onChangeText={(text)=>this.setState({name:text})} />
        <TextInput style={styles.inp} value={this.state.email} onChangeText={(text)=>this.setState({email:text})} />
         <TextInput style={styles.inp} secureTextEntry={true} value={this.state.password} onChangeText={(text)=>this.setState({password:text})} />
                
                 <Button title="Signup" style={styles.btntext}  color="#841283" accessibilityLabel="Click to login" />
                 <Button title="Login" color="#841584"  accessibilityLabel="Click to login" />
 
        </View>
      </View>
    );
	}
}


class ProfileActivity extends Component
{

  // Setting up profile activity title.
   static navigationOptions =
   {
      title: 'ProfileActivity',
    
   };
    

   render()
   {

     const {goBack} = this.props.navigation;

      return(
         <View style = { styles.MainContainer }>
 				
            <Text> { this.props.navigation.state.params.Email } </Text>


            <Button title="Click here to Logout" onPress={ () => goBack(null) } />
 
         </View>
      );
   }
}



 class Login extends Component {
	static navigationOptions =
   {
      title: 'Login',
   };
	constructor(props){
		super(props);
		this.state={name:'test@gmail.com',password:'123456',msg:''};
		this.doLogin=this.doLogin.bind(this);
	}
doLogin=()=>{

var UserEmail=this.state.name;
var UserPassword=this.state.password;
	fetch('http://fashionvilas.in/appapi/register.php', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
 
    email: UserEmail,
 
    password: UserPassword
 
  })
 
}).then((response) => response.json())
      .then((responseJson) => {
 
 			//Alert.alert(JSON.stringify(responseJson));
 		
        // If server response message same as Data Matched
       if(responseJson.status=400)
			{
				console.log(responseJson.data);
				Alert.alert(JSON.stringify(responseJson.data));
				var user=responseJson.data;
        	AsyncStorage.setItem("LOGGED_IN",1);
        	 AsyncStorage.setItem("NAME",user[1]);
        	AsyncStorage.setItem("Email",user[2]);
        	AsyncStorage.setItem("USER_ID",user[0]);
        	

   this.props.navigation.navigate('Second', { Email: UserEmail });
            //Then open Profile activity and send user email to profile activity.
            //this.props.navigation.navigate('ProfileActivity, { Email: UserEmail });
 
        }
        else{
 
          Alert.alert(responseJson);
        }
 
      }).catch((error) => {
        console.error(error);
      })
}

doReg=()=>{ this.props.navigation.navigate('Third'); }
  render() {
    return (
      <View style={styles.section}>
        <Greeting name='User' />
        <View style={styles.form}>
        <Text>{this.state.msg}</Text>
        <TextInput style={styles.inp} value={this.state.name} onChangeText={(text)=>this.setState({name:text})} />
         <TextInput style={styles.inp} secureTextEntry={true} value={this.state.password} onChangeText={(text)=>this.setState({password:text})} />
                <Button title="Login" color="#841584" onPress={this.doLogin} accessibilityLabel="Click to login" />
                 <Button title="Signup" style={styles.btntext} onPress={this.doReg} color="#841283" accessibilityLabel="Click to login" />
 
        </View>
      </View>
    );
  }
}

const styles=StyleSheet.create({
section:{
	backgroundColor:'red',
	flex:1,
	color:'white'
},

header:{
	marginTop:30,
	alignItems:'center',
	justifyContent:'center',
	height:300,
},
logo:{
	height:50,
	width:60,
},
headertext:{
	fontSize:40,
	color:'pink',
},
inp:{color:'black',
	borderColor:'pink',
	borderWidth:1,
	height:40,
	backgroundColor:'white',
},
btntext:{
marginTop:10,
paddingTop:10,
borderTopWidth:1,
borderColor:'red',

},
form:{
	justifyContent:'flex-end',
 marginBottom:120,
 backgroundColor:'pink',

},
});


const App= createStackNavigator(
  {
    Home: Login,
    Second: ProfileActivity,
    Third:Register
  },
  {
    initialRouteName: "Home"
  }
);

export default createAppContainer(App);
