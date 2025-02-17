package models

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Email       string `gorm:"unique;not null"`
	Password    string `gorm:"not null"`
	Name        *string
	Image       *string
	Description *string
	Quote       *string
	Timezone    *string

	Posts    []Post
	Comments []Comment
}

func (User) TableName() string {
	return "users"
}
