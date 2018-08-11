import React, { Component } from 'react';
import { Button, Icon, Table, Modal } from 'semantic-ui-react'
import './App.css';

class App extends Component {

  state = {
    open: false
  }

  open = () => {
    this.setState({ open: true })
  }

  close = () => {
    this.setState({ open: false })
  }

  onCreate = () => {
    <Modal
      trigger={<Button>Show Modal</Button>}
      header='Reminder!'
      content='Call Benjamin regarding the reports.'
      actions={['Snooze', { key: 'done', content: 'Done', positive: true }]}
    />
 }

  renderFrom = () => {
    const element = (
      <Table celled compact definition>
      <Table.Header fullWidth>
        <Table.Row>
          <Table.HeaderCell width={5}>Totle</Table.HeaderCell>
          <Table.HeaderCell width={5}>Author</Table.HeaderCell>
          <Table.HeaderCell width={1}>Action</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
  
      <Table.Body>
        <Table.Row>
          <Table.Cell>John Lilki</Table.Cell>
          <Table.Cell>September 14, 2013</Table.Cell>
          <Table.Cell>
            <div>
              <Button icon='setting' primary/>
              <Button icon='trash' color='red'/>
            </div>
          </Table.Cell>
        </Table.Row>
      </Table.Body>

      <Table.Footer fullWidth>
        <Table.Row>
          <Table.HeaderCell colSpan='4'>
            <Button
              floated='right'
              icon
              labelPosition='left'
              primary
              size='small'
              onClick={this.open}
            >
              <Icon name='add' /> Add
            </Button>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
    );
    return element;
  }

  render() {
    const { open } = this.state
    return (
      <div className="App">
        {
          this.renderFrom()
        }
        <Modal
          open={open} onClose={this.close}
          header='Reminder!'
          content='Call Benjamin regarding the reports.'
          actions={['Snooze', { key: 'done', content: 'Done', positive: true }]}
        />
      </div>
    );
  }
}

export default App;
