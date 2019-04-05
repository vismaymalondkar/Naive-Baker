import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';

class FeaturedCard extends Component 
{
    render() 
    { 
        return (  
            <Card border="primary">
            <Card.Img variant="top" src={this.props.recipe.imagelink} />
            <Card.Body>
                <Card.Title>{this.props.recipe.recipename}</Card.Title>
                <Card.Link href='#'>Open</Card.Link>
            </Card.Body>
            </Card>
        );
    }
}
 
export default FeaturedCard;