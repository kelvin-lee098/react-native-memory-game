import React from 'react';
import { StyleSheet, View, Button,BackHandler,Text, Alert} from 'react-native';
import { Ionicons, FontAwesome, Entypo } from '@expo/vector-icons'; // 6.2.2

import Header from '../components/Header';
import Score from '../components/Score';
import Card from '../components/Card';
import ModalResult from '../components/ModalResult';
import Modal from "react-native-modal"
//import * as cardlib from './../cardlib'
import helper from '../helpers';
export default class Single extends React.Component {

  constructor(props) {
    super(props);
    this.renderCards = this.renderCards.bind(this);
    //this.resetCards = this.resetCards.bind(this);
    this.stopGame = this.stopGame.bind(this)
    //this.onModal = this.onModal.bind(this)
    // this.num = 2 //2 4 6 8 10 12
    var lib=[
      {
        src: 'fontawesome',
        name: 'apple',
        color: 'red'
      },
      {
        src: 'entypo',
        name: 'feather',
        color: '#7d4b12'
      },
      {
        src: 'entypo',
        name: 'flashlight',
        color: '#f7911f'
      },
      {
        src: 'entypo',
        name: 'flower',
        color: '#37b24d'
      },
      {
        src: 'entypo',
        name: 'moon',
        color: '#ffd43b'
      },
      {
        src: 'entypo',
        name: 'youtube',
        color: '#FF0000'
      },
      {
        src: 'entypo',
        name: 'shop',
        color: '#5f5f5f'
      },
      {
        src: 'fontawesome',
        name: 'github',
        color: '#24292e'
      },
      {
        src: 'fontawesome',
        name: 'skype',
        color: '#1686D9'
      },
      {
        src: 'fontawesome',
        name: 'send',
        color: '#1c7cd6'
      },
      {
        src: 'ionicons',
        name: 'ios-magnet',
        color: '#d61c1c'
      },
      {
        src: 'ionicons',
        name: 'logo-facebook',
        color: '#3C5B9B'
      },
      {
        src: 'fontawesome',
        name: 'barcode',
        color: 'grey'
      },{
        src: 'fontawesome',
        name: 'download',
        color: 'black'
      },{
        src: 'fontawesome',
        name: 'camera',
        color: 'yellow'
      },{
        src: 'fontawesome',
        name: 'gift',
        color: 'blue'
      },{
        src: 'fontawesome',
        name: 'glass',
        color: 'orange'
      },{
        src: 'fontawesome',
        name: 'arrow-up',
        color: 'green'
      },{
        src: 'fontawesome',
        name: 'money',
        color: 'brown'
      },{
        src: 'fontawesome',
        name: 'undo',
        color: 'pink'
      },{
        src: 'fontawesome',
        name: 'bullseye',
        color: 'purple'
      },{
        src: 'fontawesome',
        name: 'dollar',
        color: 'green'
      },{
        src: 'fontawesome',
        name: 'rupee',
        color: '#6DEA26'
      },{
        src: 'fontawesome',
        name: 'bell-o',
        color: '#0BF3DE'
      },{
        src: 'fontawesome',
        name: 'weibo',
        color: '#F1FA2B'
      },{
        src: 'fontawesome',
        name: 'keyboard-o',
        color: '#0B245B'
      },{
        src: 'fontawesome',
        name: 'folder',
        color: '#EB28F7'
      },{
        src: 'fontawesome',
        name: 'shower',
        color: 'red'
      },{
        src: 'fontawesome',
        name: 'window-close-o',
        color: 'yellow'
      },{
        src: 'fontawesome',
        name: 'imdb',
        color: 'red'
      },{
        src: 'fontawesome',
        name: 'microchip',
        color: 'grey'
      },{
        src: 'fontawesome',
        name: 'superpowers',
        color: 'red'
      },{
        src: 'fontawesome',
        name: 'bandcamp',
        color: 'red'
      },{
        src: 'fontawesome',
        name: 'bluetooth',
        color: 'red'
      },{
        src: 'fontawesome',
        name: 'vcard',
        color: '#67F51B'
      },{
        src: 'fontawesome',
        name: 'deaf',
        color: '#DF960E'
      },{
        src: 'fontawesome',
        name: 'linode',
        color: 'red'
      },{
        src: 'fontawesome',
        name: 'etsy',
        color: 'red'
      },{
        src: 'fontawesome',
        name: 'percent',
        color: 'green'
      },{
        src: 'fontawesome',
        name: 'gitlab',
        color: 'red'
      },{
        src: 'fontawesome',
        name: 'usb',
        color: 'red'
      },{
        src: 'fontawesome',
        name: 'stop-circle',
        color: 'blue'
      }
    ]
  
    let sources = {
      'fontawesome': FontAwesome,
      'entypo': Entypo,
      'ionicons': Ionicons 
    };
    
    let cards = lib.slice(0,2)
    let clone = JSON.parse(JSON.stringify(cards));
    var clcards = cards.concat(clone);

    clcards.map((obj) => {
      let id = Math.random().toString(36).substring(7);
      obj.id = id;
      obj.src = sources[obj.src];
      obj.is_open = false;
    });

    clcards = clcards.shuffle(); 
    this.state={
      current_selection: [],
      selected_pairs: [],
      score: 0,
      level: 1,
      turn: 3,
      timer: 5,
      cards: clcards,
      num : 2,
      isModalVisible: false,
      modalNotify:'',
      lib:lib
    }
  }
  componentDidMount(){
    BackHandler.addEventListener('hardwareBackPress',()=>{
        this.props.navigation.navigate('Home');
        return true;
    });
    this.interval = setInterval(
      () => this.setState((prevState)=> ({ timer: prevState.timer - 1 })),
      1000
    );
  }
  componentDidUpdate(){
    if(this.state.timer === 0){ 
      clearInterval(this.interval);
    }
  }
  
  componentWillUnmount(){
   clearInterval(this.interval);
  }
  render() { 
    const {navigate} = this.props.navigation;
    //setTimeout(function(){alert('Time up')}, this.state.time);
    return (
      <View style={styles.container}>
        <Header type='Single Player' level={this.state.level} />
        <View style={styles.body}>
          { 
            this.renderRows.call(this) 
          }
        </View>
        <ModalResult style={{width:300}} isModalVisible={this.state.isModalVisible} onModal = {this.onModal} 
                     text={this.state.modalNotify} navigate = {navigate} score={this.state.score}
        />
        <Score score={this.state.score} />
        <Text>Time: {this.state.timer}</Text>
        <Text>Turn: {this.state.turn}</Text>
        <Button
          onPress={this.stopGame}
          title="Stop"
          color="#EF1457" 
        />
      </View>
    );
  }
  
  onModal = (message) =>{
    this.setState({ 
      modalNotify: message,
      isModalVisible: !this.state.isModalVisible
    });
  }

  stopGame =()=>{
    this.onModal('Sure?')
  }

  // resetCards() {
  //   let cards = this.cards.map((obj) => {
  //     obj.is_open = false;
  //     return obj;
  //   });

  //   cards = cards.shuffle();

  //   this.setState({
  //     current_selection: [],
  //     selected_pairs: [],
  //     cards: cards,
  //     score: 0
  //   });
  // }


  renderRows() {
   
    let contents = this.getRowContents(this.state.cards);
    return contents.map((cards, index) => {
      return (
        <View key={index} style={styles.row}>
          { this.renderCards(cards) }
        </View>
      );
    });
   
  } 


  renderCards(cards) {
    //console.log(cards)
    return cards.map((card, index) => {
      return (
        <Card 
          key={index} 
          src={card.src} 
          name={card.name} 
          color={card.color} 
          is_open={card.is_open}
          clickCard={this.clickCard.bind(this, card.id)} 
        />
      );
    });
  }

  getLib(number){
    var lastIndex = 0
    for(let i=2;i<=number;i+=2){
      lastIndex+=i
    }
    // number = 2  =>     array[0..1]        splice(0,2)
    //          4         array[2...5]       splice(2,6)
    //          6         array[6...11]      splice(6,12)
    //          8         array[12...19]     splice(12,20)
    //          10         array[20...29]    splice(20,30)
    //          12         array[30...41]    splice(30,42)
    //number  4 6 8 10 12 
    let newCards = this.state.lib.slice(lastIndex-number,lastIndex)
    let newClone = JSON.parse(JSON.stringify(newCards));
    newCards = newCards.concat(newClone);
    let sources = {
      'fontawesome': FontAwesome,
      'entypo': Entypo,
      'ionicons': Ionicons 
    }
    newCards.map((obj) => {
      let id = Math.random().toString(36).substring(7);
      obj.id = id;
      obj.src = sources[obj.src];
      obj.is_open = false;
    })

    newCards = newCards.shuffle();

    return newCards
  }

  clickCard(id) {
    var _selected_pairs = this.state.selected_pairs;
    var _current_selection = this.state.current_selection;
    var _score = this.state.score;
    var _num = this.state.num
    var _level = this.state.level
    var _turn = this.state.turn
    let index = this.state.cards.findIndex((card) => { 
      return card.id == id;
    });
    if(_turn === 0){
      this.onModal('Game Over')
    }
    var _cards = this.state.cards;
    if(_cards[index].is_open === false && _selected_pairs.indexOf(_cards[index].name) === -1){

      _cards[index].is_open = true;
    
      _current_selection.push({    
        index: index,
        name: _cards[index].name
      });

      if(_current_selection.length == 2){
        _turn -=1
        this.setState({turn:_turn})
        if(_current_selection[0].name == _current_selection[1].name){
          _score += 1;
          _selected_pairs.push(_cards[index].name);
        }else{     
          _cards[_current_selection[0].index].is_open = false;

          setTimeout(() => {
            _cards[index].is_open = false;
            this.setState({
              cards: _cards
            });
          }, 500);
        }

        _current_selection = [];
      }
      if(_selected_pairs.length===_num){
        _num +=2
        _level +=1
        let newCards = this.getLib(_num)
        _cards = newCards
        _selected_pairs=[]
        _current_selection=[]
      }
      if(_score==42){
        this.onModal('VICTORY !!!')
        _num-=2
      }
      this.setState({
        score: _score,
        level: _level,
        cards: _cards,
        current_selection: _current_selection,
        selected_pairs: _selected_pairs,
        num: _num,
      })
    }
  }


  getRowContents(cards) {
    let contents_r = [];
    let contents = [];
    let count = 0;
    cards.forEach((item) => {
      count += 1;
      contents.push(item);
      if(this.state.num===2 && count == this.state.num){
        contents_r.push(contents)
        count = 0;
        contents = [];
      }else if(this.state.num > 2 && count === 4){
        contents_r.push(contents)
        count = 0;
        contents = [];
      }
    });

    return contents_r;
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#fff'
  },
  row: {
    flex: 1,
    flexDirection: 'row'
  },
  body: {
    flex: 18,
    justifyContent: 'space-between',
    padding: 10,
    marginTop: 20
  }
});
