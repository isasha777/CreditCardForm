import React, { useState } from 'react';
import './CreditCardForm.css';

function CreditCardForm() {
    const [cardDetails, setCardDetails] = useState({
        cardHolder: '',
        cardNumber: '',
        expiryMonth: '',
        expiryYear: '',
        cvv: ''
    });

    const [errors, setErrors] = useState({
        cardHolder: '',
        cardNumber: '',
        expiryDate: '',
        cvv: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCardDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
    }

    const validate = () => {
        let newErrors = {};

        // Имя держателя карты
        if (!/^[a-zA-Z\s]+$/.test(cardDetails.cardHolder)) {
            newErrors.cardHolder = 'Введите корректное имя';
        }

        // Номер карты
        if (!/^\d{16}$/.test(cardDetails.cardNumber)) {
            newErrors.cardNumber = 'Номер карты должен содержать 16 цифр';
        }

        // Срок действия карты
        if (!cardDetails.expiryMonth || !cardDetails.expiryYear) {
            newErrors.expiryDate = 'Выберите месяц и год';
        }

        // CVV
        if (!/^\d{3}$/.test(cardDetails.cvv)) {
            newErrors.cvv = 'CVV должен содержать 3 цифры';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            
            console.log("Данные карты:", cardDetails);
        }
    }

    // Текущий год для списка лет
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 10 }, (_, i) => currentYear + i);

    return (
        <div className="cardFormContainer">
            <h2>Введите данные вашей карты:</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="cardHolder" 
                    placeholder="Держатель карты" 
                    value={cardDetails.cardHolder} 
                    onChange={handleChange} 
                />
                {errors.cardHolder && <div className="error">{errors.cardHolder}</div>}

                <input 
                    type="text" 
                    name="cardNumber" 
                    placeholder="Номер карты" 
                    maxLength="16"
                    value={cardDetails.cardNumber} 
                    onChange={handleChange} 
                />
                {errors.cardNumber && <div className="error">{errors.cardNumber}</div>}

                <div className="expirySection">
                    <select
                        name="expiryMonth"
                        value={cardDetails.expiryMonth}
                        onChange={handleChange}
                    >
                        <option value="">ММ</option>
                        {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                            <option key={month} value={month}>
                                {month.toString().padStart(2, '0')}
                            </option>
                        ))}
                    </select>
                    <select
                        name="expiryYear"
                        value={cardDetails.expiryYear}
                        onChange={handleChange}
                    >
                        <option value="">ГГ</option>
                        {years.map(year => (
                            <option key={year} value={year.toString().slice(-2)}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>
                {errors.expiryDate && <div className="error">{errors.expiryDate}</div>}

                <input 
                    type="password" 
                    name="cvv" 
                    placeholder="CVV" 
                    maxLength="3"
                    value={cardDetails.cvv} 
                    onChange={handleChange} 
                />
                {errors.cvv && <div className="error">{errors.cvv}</div>}

                <button className='submit-button' type="submit">Отправить</button>
            </form>
        </div>
    );
}

export default CreditCardForm;
