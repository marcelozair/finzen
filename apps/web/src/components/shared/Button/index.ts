import { Button as ButtonHOC } from './Button';
import { Container } from './ButtonContainer';

export const Button = Object.assign(ButtonHOC, {
   Container,
})