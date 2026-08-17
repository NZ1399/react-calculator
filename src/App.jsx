import { useState } from 'react'; /* Сходи в пакет react, достань оттуда функцию useState и принеси её в этот файл */
import Button from './Button.jsx';
import './App.css';
function App() {   /* Создали функцию с именем App  */
  const [displayValue, setDisplayValue] = useState('0');  /* Позвали useState и дали ей стартовое значение — строку 0 */
  const [firstNumber, setFirstNumber] = useState(null);
  const [operator, setOperator] = useState(null);
  const [isNewNumber, setIsNewNumber] = useState(false);
  const buttonValues = [
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    'C', '0', '=', '+',
  ];
  const operations = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => a / b,
  };
  const handleOperatorClick = (nextOperator) => {
    setFirstNumber(displayValue);
    setOperator(nextOperator);
    setIsNewNumber(true);
  };
  const handleNumberClick = (value) => {
    setDisplayValue(
      isNewNumber || displayValue === '0' ? value : displayValue + value
    );
    setIsNewNumber(false);
  };
  const handleButtonClick = (value) => {
    if (value === 'C') return handleClearClick();
    if (value === '=') return handleEqualClick();
    if (operations[value]) return handleOperatorClick(value);
    handleNumberClick(value);
  };
  const handleClearClick = () => {
    setDisplayValue('0');
    setFirstNumber(null);
    setOperator(null);
    setIsNewNumber(false);
  };
  const handleEqualClick = () => {
    if (operator === null) return;

    const first = Number(firstNumber);
    const second = Number(displayValue);
    const result = operations[operator](first, second);

    setDisplayValue(String(result));
    setFirstNumber(null);
    setOperator(null);
    setIsNewNumber(true);
  };
  return (
    <div className="calculator">
     <div className="display">{displayValue}
     </div>
     <div className="buttons">
      {buttonValues.map((value) => (
        <Button
          key={value}
          label={value}
          onClick={() => handleButtonClick(value)}
        />
      ))}
     </div>
    </div>
  );
}
export default App; /* расшарити доступ до головногу компоненту файла */