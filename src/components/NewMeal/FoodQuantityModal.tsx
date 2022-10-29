import { useEffect, useState } from 'react'
import Modal from '../Modal'
import Input from '../Input'
import helper from '../../utils/helper'
import styles from './FoodQuantityModal.module.css'

interface FoodQuantityModalProps {
  open: boolean
  onClose: () => void
  foodId: string
  foodName: string
  defaultQuantity: number
  unit: string
  onSave: (foodId: string, quantity: number) => void
}

export default function FoodQuantityModal({ open, onClose, onSave, foodId, foodName, defaultQuantity, unit }: FoodQuantityModalProps) {
  const [quantity, setQuantity] = useState(helper.formatNumberInput(defaultQuantity.toFixed(2).toString()))

  useEffect(() => {
    setQuantity(helper.formatNumberInput(defaultQuantity.toFixed(2).toString()))
  }, [defaultQuantity, open])

  function saveQuantity() {
    onSave(foodId, Number(quantity.replace(',', '.')))
    onClose()
  }

  return (
    <Modal className={styles['food-quantity-modal']} open={open} title="Alterar quantidade" onClose={onClose}>
      <div className={styles['modal-container']}>
        <h2>{foodName}</h2>
        <label>{`Quantidade (${unit})`}</label>
        <Input
          type="text"
          className={styles['quantity-input']}
          placeholder={`Quantidade (${unit})`}
          onChange={(e) => setQuantity(helper.formatNumberInput(e.target.value))}
          value={quantity}
        />
        <button className={styles['btn-save']} onClick={saveQuantity}>Salvar</button>
      </div>
    </Modal>
  )
}