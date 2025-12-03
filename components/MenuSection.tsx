import { isShowMenu } from '@/hooks/isShowMenu'
import { BusinessFormData } from '@/types';
import { Menu, Plus, Trash2, X } from 'lucide-react';
import React from 'react'

interface pageProps {
    formData: BusinessFormData;
    setFormData: React.Dispatch<React.SetStateAction<BusinessFormData>>;
}
const MenuSection = ({formData, setFormData}: pageProps) => {
        const addCategory = () => {
          setFormData((prev) => ({
            ...prev,
            menu: {
              ...prev.menu,
              categories: [
                ...(prev?.menu?.categories || []),
                {
                  name: '',
                  items: [
                    {
                      name: '',
                      description: '',
                      price: '',
                      image: '',
                      popular: false,
                      spicy: false,
                      vegetarian: false,
                    }
                  ]
                }
              ]
            }
          }));
      };
    
      const removeCategory = (categoryIndex: number) => {
    
        setFormData((prev) => ({
          ...prev,
          menu: {
            ...prev.menu,
            categories: (prev.menu?.categories ?? []).filter((_, i) => i !== categoryIndex)
          }
        }));
      };
    
     const updateCategoryName = (categoryIndex: number, name: string) => {
        setFormData(prev => ({
          ...prev,
          menu: {
            ...prev.menu,
            categories: (prev.menu?.categories || []).map((cat, i) =>
              i === categoryIndex
                ? { ...cat, name }
                : cat
            )
          }
        }));
      };
    
    const addItem = (categoryIndex: number) => {
      setFormData(prev => ({
        ...prev,
        menu: {
          ...prev.menu,
          categories: (prev.menu?.categories || []).map((cat, i) => {
            if (i === categoryIndex) {
              return {
                ...cat,
                items: [
                  ...cat.items,
                  {
                    name: '',
                    description: '',
                    price: '',
                    image: '',
                    popular: false,
                    spicy: false,
                    vegetarian: false,
                  }
                ]
              };
            }
            return cat;
          })
        }
      }));
    };
    
    
      const removeItem = (categoryIndex: number, itemIndex: number) => {
      setFormData(prev => ({
        ...prev,
        menu: {
          ...prev.menu,
          categories: (prev.menu?.categories || []).map((cat, i) => {
              if (i === categoryIndex) {
                return {
                  ...cat,
                  items: cat.items.filter((_, j) => j !== itemIndex)
                };
              }
              return cat;
            })
          }
        }));
      };
    
      const updateItem = (
      categoryIndex: number,
      itemIndex: number,
      field: string,
      value: string | number | boolean
    ) => {
      setFormData(prev => ({
        ...prev,
        menu: {
          ...prev.menu,
          categories: (prev.menu?.categories || []).map((cat, i) => {
            if (i === categoryIndex) {
              return {
                ...cat,
                items: cat.items.map((item, j) => {
                  if (j === itemIndex) {
                    return {
                      ...item,
                      [field]: value
                    };
                  }
                  return item;
                })
              };
            }
            return cat;
          })
        }
      }));
    };
  return (
    <div>
      {isShowMenu(formData.category) && (
              <div>
                <h4 className="text-lg font-semibold text-gray-800 flex items-center">
                  <Menu className="w-4 h-4 mr-2 text-blue-600" />
                  Menu
                </h4>
                {formData?.menu?.categories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="mb-8 border mt-2 border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="flex items-center gap-3 mb-4">
                  <input
                    type="text"
                    placeholder="Category Name (e.g., Appetizers)"
                    value={category.name}
                    onChange={(e) => updateCategoryName(categoryIndex, e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => removeCategory(categoryIndex)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {category.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="mb-4 p-4 bg-white border border-gray-200 rounded-md">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-medium text-gray-700">Item {itemIndex + 1}</h4>
                      <button
                        type="button"
                        onClick={() => removeItem(categoryIndex, itemIndex)}
                        className="text-red-600 hover:bg-red-50 p-1 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Item Name"
                        value={item.name}
                        onChange={(e) => updateItem(categoryIndex, itemIndex, 'name', e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Price (e.g., $9.99)"
                        value={item.price}
                        onChange={(e) => updateItem(categoryIndex, itemIndex, 'price', e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <textarea
                      placeholder="Description"
                      value={item.description}
                      onChange={(e) => updateItem(categoryIndex, itemIndex, 'description', e.target.value)}
                      className="w-full mt-3 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={2}
                      required
                    />

                    <input
                      type="text"
                      placeholder="Image URL (optional)"
                      value={item.image || ''}
                      onChange={(e) => updateItem(categoryIndex, itemIndex, 'image', e.target.value)}
                      className="w-full mt-3 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />

                    <div className="flex gap-4 mt-3">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={item.popular || false}
                          onChange={(e) => updateItem(categoryIndex, itemIndex, 'popular', e.target.checked)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">Popular</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={item.spicy || false}
                          onChange={(e) => updateItem(categoryIndex, itemIndex, 'spicy', e.target.checked)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">Spicy</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={item.vegetarian || false}
                          onChange={(e) => updateItem(categoryIndex, itemIndex, 'vegetarian', e.target.checked)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">Vegetarian</span>
                      </label>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => addItem(categoryIndex)}
                  className="w-full mt-3 px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Item
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={addCategory}
              className="w-full mb-6 px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center gap-2 font-medium"
            >
              <Plus className="w-5 h-5" />
              Add Category
            </button>
              </div>
              )}
    </div>
  )
}

export default MenuSection
