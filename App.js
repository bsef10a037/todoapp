import React, {Component, useState} from 'react';
import {View, Text, Button, StyleSheet, TextInput,ScrollView,CheckBox} from 'react-native';

const App = () => {
  const [todos,setTodos] = useState([]);
  const [textFieldValue,setTextFieldValue] = useState('');
  const [Key,setKey] = useState('');
  const [DeleteKey,setDeleteKey] = useState([]);
  
  return (
    <View style={styles.container}>
      <View style={styles.fieldContainer}>
        <TextInput 
        placeholder="Todo Text"
        placeholderTextColor="#000"
        style={styles.todoTextInput}
        value={textFieldValue}
        onChangeText={(newText)=>{
          setTextFieldValue(newText)
        }}
        />
       {
         DeleteKey.length > 0  ? <Button 
          title="Delete Marked"
          onPress={()=>{
            let existingData = [...todos];
            // DeleteKey.map((d,i)=>(
            //     // existingData.splice(d,1)
            //     // delete existingData[data]
            //     const exactIndex = existingData.indexOf(d)
            //     existingData.splice(exactIndex, 1)
                
              
            // ))
            for(i=0 ; i<DeleteKey.length; i++){
              var exactIndex = existingData.indexOf(DeleteKey[i])
                existingData.splice(exactIndex, 1)
            }
              
                setTodos(existingData);
                setDeleteKey([]);
          }}
        /> : Key.length == 0 ?
       <Button 
          title="Add"
          onPress={()=>{
            if(!textFieldValue.length){
              alert('Please enter some text')
              return;
            }
            setTodos([
              ...todos,
              textFieldValue
            ]);
            setTextFieldValue('')
          }}
        /> : <Button 
          title="Update"
          onPress={()=>{
            if(!textFieldValue.length){
              alert('Please enter some text')
              return;
            }
            let existingData  = [...todos];
            existingData[Key] = textFieldValue;
            setTodos(
              existingData
            );
            setTextFieldValue('')
            setKey('')
          }}
        />
       }
       
       
          
        
          
      </View>
      <ScrollView style={styles.itemsContainer}>
        {todos.map((data,index)=>(
          <View key={index} style={styles.item}>
          <CheckBox 
          
          onValueChange= {()=>{
            setDeleteKey([
              ...DeleteKey,
              data
            ])
          }}
          style={styles.checkbox}
        />
            <Text style={styles.itemText}>{data}</Text>
            <Button 
              title="Edit"
              onPress={()=>{
                setTextFieldValue(data);
                setKey(index);
              }}
            />
            <Button 
              title="Delete"
              onPress={()=>{
                let existingData = [...todos];
                existingData.splice(index,1)
                setTodos(existingData);
              }}
            />
          </View> 
        ))}
        {todos.length == 0 ? <View style={styles.noTodosContainer}>
          <Text>No Todos Added Yet</Text>
        </View> : null}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    backgroundColor:"#fff",
    flex:1
  },
  fieldContainer:{
    flexDirection:"row"
  },
  todoTextInput:{
    backgroundColor:"#ccc",
    flex:1
  },
  itemsContainer:{
    flex:1
  },
  item:{
    padding:10,
    elevation:5,
    margin:10,
    backgroundColor:"#fff",
    flexDirection:"row"
  },
  itemText:{
    fontSize:20,
    flex:1
  },
  noTodosContainer:{
    flex:1,
    alignItems:"center"
  },
  checkbox: {
    alignSelf: "center",
  },
});

export default App;