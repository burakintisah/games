"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit, Trash2, Eye, EyeOff, Save, X, Search, Filter } from 'lucide-react';
import { conversationCardsAPI } from '../../lib/api';
import type { ConversationCard, SupportedLanguage } from '../../../shared/src';

interface AdminState {
  isAuthenticated: boolean;
  cards: ConversationCard[];
  isLoading: boolean;
  error: string | null;
  editingCard: ConversationCard | null;
  isCreating: boolean;
  searchTerm: string;
  filterCategory: string;
  filterDifficulty: string;
}

const CATEGORIES = ['relationships', 'self-knowledge', 'work', 'culture', 'philosophy', 'childhood'];
const DIFFICULTIES = ['easy', 'medium', 'hard'];
const AUTH_TOKEN_KEY = 'admin_api_token';

export default function AdminPanel() {
  const [state, setState] = useState<AdminState>({
    isAuthenticated: false,
    cards: [],
    isLoading: false,
    error: null,
    editingCard: null,
    isCreating: false,
    searchTerm: '',
    filterCategory: '',
    filterDifficulty: ''
  });

  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    question: { en: '', tr: '' },
    category: 'relationships',
    difficulty: 'medium' as 'easy' | 'medium' | 'hard',
    tags: [] as string[]
  });

  // Check authentication on component mount
  useEffect(() => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (token) {
      setState(prev => ({ ...prev, isAuthenticated: true }));
      loadCards(token);
    }
  }, []);

  // Load cards after authentication
  const loadCards = async (token?: string) => {
    const apiToken = token || localStorage.getItem(AUTH_TOKEN_KEY);
    if (!apiToken) return;

    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      const response = await conversationCardsAPI.getAdminCards({ limit: 500 }, apiToken);

      setState(prev => ({
        ...prev,
        cards: response.data?.cards || [],
        isLoading: false
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to load cards',
        isLoading: false
      }));
    }
  };

  // Authentication - token is verified server-side via admin endpoint
  const handleLogin = async () => {
    if (!password.trim()) {
      setState(prev => ({ ...prev, error: 'Please enter an API token' }));
      return;
    }

    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      // Verify token by calling the admin endpoint
      const response = await conversationCardsAPI.getAdminCards({ limit: 1 }, password.trim());
      localStorage.setItem(AUTH_TOKEN_KEY, password.trim());
      setState(prev => ({ ...prev, isAuthenticated: true, isLoading: false }));
      loadCards(password.trim());
    } catch {
      setState(prev => ({ ...prev, error: 'Invalid API token', isLoading: false }));
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    setState(prev => ({ 
      ...prev, 
      isAuthenticated: false, 
      cards: [], 
      editingCard: null, 
      isCreating: false 
    }));
    setPassword('');
  };

  // Create new card
  const handleCreate = async () => {
    if (!formData.question.en.trim() || !formData.question.tr.trim()) {
      setState(prev => ({ ...prev, error: 'Both English and Turkish questions are required' }));
      return;
    }

    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      await conversationCardsAPI.createCard(formData);
      await loadCards();
      setState(prev => ({ ...prev, isCreating: false }));
      setFormData({
        question: { en: '', tr: '' },
        category: 'relationships',
        difficulty: 'medium',
        tags: []
      });
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        error: error instanceof Error ? error.message : 'Failed to create card',
        isLoading: false 
      }));
    }
  };

  // Update card
  const handleUpdate = async () => {
    if (!state.editingCard || !formData.question.en.trim() || !formData.question.tr.trim()) {
      setState(prev => ({ ...prev, error: 'Both English and Turkish questions are required' }));
      return;
    }

    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      await conversationCardsAPI.updateCard(state.editingCard.id, formData);
      await loadCards();
      setState(prev => ({ ...prev, editingCard: null }));
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        error: error instanceof Error ? error.message : 'Failed to update card',
        isLoading: false 
      }));
    }
  };

  // Delete card
  const handleDelete = async (cardId: string) => {
    if (!confirm('Are you sure you want to delete this card?')) return;

    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      await conversationCardsAPI.deleteCard(cardId);
      await loadCards();
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        error: error instanceof Error ? error.message : 'Failed to delete card',
        isLoading: false 
      }));
    }
  };

  // Start editing
  const startEdit = (card: ConversationCard) => {
    setState(prev => ({ ...prev, editingCard: card }));
    setFormData({
      question: card.question,
      category: card.category,
      difficulty: card.difficulty,
      tags: card.tags || []
    });
  };

  // Filter cards
  const filteredCards = state.cards.filter(card => {
    const matchesSearch = state.searchTerm === '' || 
      card.question.en.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
      card.question.tr.toLowerCase().includes(state.searchTerm.toLowerCase());
    
    const matchesCategory = state.filterCategory === '' || card.category === state.filterCategory;
    const matchesDifficulty = state.filterDifficulty === '' || card.difficulty === state.filterDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  // Login screen
  if (!state.isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md"
        >
          <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Admin Panel</h1>
          
          {state.error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
              {state.error}
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                API Token
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  placeholder="Enter admin API token"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            
            <button
              onClick={handleLogin}
              className="w-full bg-violet-600 text-white py-2 px-4 rounded-lg hover:bg-violet-700 transition-colors"
            >
              Login
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">Conversation Cards Admin</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">{state.cards.length} total cards</span>
              <button
                onClick={() => setState(prev => ({ ...prev, isCreating: true }))}
                className="flex items-center gap-2 bg-violet-600 text-white px-4 py-2 rounded-lg hover:bg-violet-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Card
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  value={state.searchTerm}
                  onChange={(e) => setState(prev => ({ ...prev, searchTerm: e.target.value }))}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  placeholder="Search questions..."
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={state.filterCategory}
                onChange={(e) => setState(prev => ({ ...prev, filterCategory: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              >
                <option value="">All Categories</option>
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
              <select
                value={state.filterDifficulty}
                onChange={(e) => setState(prev => ({ ...prev, filterDifficulty: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              >
                <option value="">All Difficulties</option>
                {DIFFICULTIES.map(diff => (
                  <option key={diff} value={diff}>{diff}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Error Display */}
        {state.error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {state.error}
          </div>
        )}

        {/* Cards List */}
        <div className="bg-white rounded-lg shadow-sm">
          {state.isLoading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading...</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredCards.map((card) => (
                <div key={card.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          card.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                          card.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {card.difficulty}
                        </span>
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                          {card.category}
                        </span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                          ID: {card.id}
                        </span>
                      </div>
                      
                      <div className="space-y-2">
                        <div>
                          <span className="text-xs text-gray-500 font-medium">EN:</span>
                          <p className="text-gray-900 mt-1">
                            {card.question?.en || 'No English question'}
                          </p>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500 font-medium">TR:</span>
                          <p className="text-gray-700 mt-1">
                            {card.question?.tr || 'No Turkish question'}
                          </p>
                        </div>
                      </div>
                      
                      {card.tags && card.tags.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {card.tags.map((tag, index) => (
                            <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      {/* Vote stats if available */}
                      {(card.upvotes || card.downvotes) && (
                        <div className="mt-2 flex items-center gap-4 text-xs text-gray-500">
                          <span>👍 {card.upvotes || 0}</span>
                          <span>👎 {card.downvotes || 0}</span>
                          <span>Total: {card.totalVotes || 0}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 ml-4">
                      <button
                        onClick={() => startEdit(card)}
                        className="p-2 text-gray-400 hover:text-violet-600 hover:bg-violet-50 rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(card.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              
              {filteredCards.length === 0 && !state.isLoading && (
                <div className="p-8 text-center text-gray-500">
                  {state.cards.length === 0 ? 'No cards found. Try creating some!' : 'No cards found matching your criteria.'}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Create/Edit Modal */}
      <AnimatePresence>
        {(state.isCreating || state.editingCard) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">
                    {state.isCreating ? 'Create New Card' : 'Edit Card'}
                  </h2>
                  <button
                    onClick={() => setState(prev => ({ ...prev, isCreating: false, editingCard: null }))}
                    className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="space-y-6">
                  {/* English Question */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      English Question *
                    </label>
                    <textarea
                      value={formData.question.en}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        question: { ...prev.question, en: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                      rows={3}
                      placeholder="Enter the question in English..."
                    />
                  </div>
                  
                  {/* Turkish Question */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Turkish Question *
                    </label>
                    <textarea
                      value={formData.question.tr}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        question: { ...prev.question, tr: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                      rows={3}
                      placeholder="Enter the question in Turkish..."
                    />
                  </div>
                  
                  {/* Category and Difficulty */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                      >
                        {CATEGORIES.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Difficulty
                      </label>
                      <select
                        value={formData.difficulty}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          difficulty: e.target.value as 'easy' | 'medium' | 'hard'
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                      >
                        {DIFFICULTIES.map(diff => (
                          <option key={diff} value={diff}>{diff}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  {/* Tags */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tags (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={formData.tags.join(', ')}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        tags: e.target.value.split(',').map(tag => tag.trim()).filter(Boolean)
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                      placeholder="e.g., love, relationships, growth"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => setState(prev => ({ ...prev, isCreating: false, editingCard: null }))}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={state.isCreating ? handleCreate : handleUpdate}
                    disabled={state.isLoading}
                    className="flex items-center gap-2 px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors disabled:opacity-50"
                  >
                    <Save className="w-4 h-4" />
                    {state.isLoading ? 'Saving...' : 'Save'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 