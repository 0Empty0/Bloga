package models

import "gorm.io/gorm"

type Comment struct {
	gorm.Model
	Content string `gorm:"not null"`

	UserID uint
	User   User

	PostID uint
	Post   Post

	ParentCommentID *uint
	ParentComment   *Comment  `gorm:"foreignKey:ParentCommentID"`
	Replies         []Comment `gorm:"foreignKey:ParentCommentID"`
}

func (Comment) TableName() string {
	return "comments"
}
