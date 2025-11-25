import { describe, it, expect } from 'vitest'
import { evaluateAnswer } from '../question-evaluator'

describe('evaluateAnswer', () => {
  describe('SINGLE_CHOICE questions', () => {
    const options = [
      { id: '1', text: 'Option A', isCorrect: true },
      { id: '2', text: 'Option B', isCorrect: false },
      { id: '3', text: 'Option C', isCorrect: false },
    ]

    it('should return correct when selecting the right answer', () => {
      const result = evaluateAnswer('SINGLE_CHOICE', options, ['1'])
      expect(result.isCorrect).toBe(true)
      expect(result.correctAnswers).toContain('Option A')
    })

    it('should return incorrect when selecting the wrong answer', () => {
      const result = evaluateAnswer('SINGLE_CHOICE', options, ['2'])
      expect(result.isCorrect).toBe(false)
    })

    it('should return incorrect when no answer selected', () => {
      const result = evaluateAnswer('SINGLE_CHOICE', options, [])
      expect(result.isCorrect).toBe(false)
    })
  })

  describe('MULTIPLE_CHOICE questions', () => {
    const options = [
      { id: '1', text: 'Option A', isCorrect: true },
      { id: '2', text: 'Option B', isCorrect: true },
      { id: '3', text: 'Option C', isCorrect: false },
      { id: '4', text: 'Option D', isCorrect: false },
    ]

    it('should return correct when selecting all correct answers', () => {
      const result = evaluateAnswer('MULTIPLE_CHOICE', options, ['1', '2'])
      expect(result.isCorrect).toBe(true)
    })

    it('should return incorrect when missing a correct answer', () => {
      const result = evaluateAnswer('MULTIPLE_CHOICE', options, ['1'])
      expect(result.isCorrect).toBe(false)
    })

    it('should return incorrect when selecting an incorrect answer', () => {
      const result = evaluateAnswer('MULTIPLE_CHOICE', options, ['1', '2', '3'])
      expect(result.isCorrect).toBe(false)
    })

    it('should return correct answers in feedback', () => {
      const result = evaluateAnswer('MULTIPLE_CHOICE', options, ['3'])
      expect(result.correctAnswers).toContain('Option A')
      expect(result.correctAnswers).toContain('Option B')
    })
  })

  describe('TRUE_FALSE questions', () => {
    const optionsTrue = [
      { id: '1', text: 'True', isCorrect: true },
      { id: '2', text: 'False', isCorrect: false },
    ]

    const optionsFalse = [
      { id: '1', text: 'True', isCorrect: false },
      { id: '2', text: 'False', isCorrect: true },
    ]

    it('should return correct for right True answer', () => {
      const result = evaluateAnswer('TRUE_FALSE', optionsTrue, ['1'])
      expect(result.isCorrect).toBe(true)
    })

    it('should return correct for right False answer', () => {
      const result = evaluateAnswer('TRUE_FALSE', optionsFalse, ['2'])
      expect(result.isCorrect).toBe(true)
    })
  })

  describe('FILL_IN_BLANK questions', () => {
    const options = [
      { id: '1', text: 'extends', isCorrect: true },
    ]

    it('should return correct for exact match', () => {
      const result = evaluateAnswer('FILL_IN_BLANK', options, [], 'extends')
      expect(result.isCorrect).toBe(true)
    })

    it('should return correct for case-insensitive match', () => {
      const result = evaluateAnswer('FILL_IN_BLANK', options, [], 'EXTENDS')
      expect(result.isCorrect).toBe(true)
    })

    it('should return correct with extra whitespace', () => {
      const result = evaluateAnswer('FILL_IN_BLANK', options, [], '  extends  ')
      expect(result.isCorrect).toBe(true)
    })

    it('should return incorrect for wrong answer', () => {
      const result = evaluateAnswer('FILL_IN_BLANK', options, [], 'implements')
      expect(result.isCorrect).toBe(false)
    })

    it('should return incorrect for empty answer', () => {
      const result = evaluateAnswer('FILL_IN_BLANK', options, [])
      expect(result.isCorrect).toBe(false)
    })
  })

  describe('CODE_WILL_COMPILE questions', () => {
    const options = [
      { id: '1', text: 'Will compile and run successfully', isCorrect: false },
      { id: '2', text: 'Will not compile', isCorrect: true },
      { id: '3', text: 'Compiles but throws runtime exception', isCorrect: false },
    ]

    it('should evaluate like single choice', () => {
      const result = evaluateAnswer('CODE_WILL_COMPILE', options, ['2'])
      expect(result.isCorrect).toBe(true)
    })

    it('should return incorrect for wrong compile prediction', () => {
      const result = evaluateAnswer('CODE_WILL_COMPILE', options, ['1'])
      expect(result.isCorrect).toBe(false)
    })
  })
})
