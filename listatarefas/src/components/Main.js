import React, { Component } from 'react';

import Form from './Form';
import Tarefas from './Tarefas';

import './Main.css';

export default class Main extends Component {
  state = {
    novaTarefa: '',
    tarefas: [],
    index: -1,
  };

  componentDidMount() {
    const tarefas = JSON.parse(localStorage.getItem('tarefas'));

    if (!tarefas) return;

    this.setState({ tarefas });
  }

  componentDidUpdate(preProps, prevState) {
    const { tarefas } = this.state;

    if (tarefas === prevState.tarefas) return;

    localStorage.setItem('tarefas', JSON.stringify(tarefas));
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { tarefas } = this.state;
    let { novaTarefa } = this.state;
    novaTarefa = novaTarefa.trim();

    if (tarefas.indexOf(novaTarefa) != -1) return;

    const novaTarefas = [...tarefas];

    if (this.state.index === -1) {
      this.setState({
        tarefas: [...novaTarefas, novaTarefa],
        novaTarefa: '',
      });
    } else {
      novaTarefas.splice(this.state.index, 1, novaTarefa);
      this.setState({
        tarefas: [...novaTarefas],
        novaTarefa: '',
        index: -1,
      });
    }
  };

  handleChange = (e) => {
    this.setState({
      novaTarefa: e.target.value,
    });
  };

  handleEdit = (e, index) => {
    const { tarefas } = this.state;

    this.setState({
      index,
      novaTarefa: tarefas[index],
    });
  };

  handleDelet = (e, index) => {
    const { tarefas } = this.state;
    const deletTarefa = [...tarefas];
    deletTarefa.splice(index, 1);

    this.setState({
      tarefas: [...deletTarefa],
    });
  };

  render() {
    const { novaTarefa, tarefas } = this.state;

    return (
      <div className='main'>
        <h1>Lista de tarefas</h1>

        <Form
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          novaTarefa={novaTarefa}
        />

        <Tarefas
          tarefas={tarefas}
          handleEdit={this.handleEdit}
          handleDelet={this.handleDelet}
        />
      </div>
    );
  }
}