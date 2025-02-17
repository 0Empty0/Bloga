package models

import "gorm.io/gorm"

type Post struct {
	gorm.Model
	Title      string `gorm:"not null"`
	Content    string `gorm:"not null"`
	Image      *string
	TimeToRead int `gorm:"not null"`

	UserID   uint
	User     User
	Comments []Comment
}

func (Post) TableName() string {
	return "posts"
}
