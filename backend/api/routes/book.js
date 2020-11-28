const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Book = require("../database/model/book");

const basePath = "https://ucam-it.herokuapp.com/";
//book list
router.get("/", (req, res, next) => {
    Book.find()
        .select()
        .exec()
        .then((allBook) => {
            const response = {
                "Number of book": allBook.length,
                Books: allBook.map((book) => {
                    return {
                        id: book._id,
                        name: book.name,
                        author: book.author,
                        edition: book.edition,
                        total: book.total,
                        available: book.available,
                        category: book.category,
                        students: book.students
                    };
                }),
            };
            res.status(200).json(response);
        })
        .catch((err) => {
            console.log(err);
        });
});

//Single book
router.get("/:bookid", (req, res, next) => {
    const id = req.params.bookid;
    quryMethod = Book.find({ _id: id });
    quryMethod
        .select()
        .exec()
        .then((info) => {
            console.log(info);
            res.status(200).json(info);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ Result: "No search found", error: err });
        });
});

//book list based on Category
router.get("/category/:bookcategory", (req, res, next) => {
    var category = req.params.bookcategory
    Book.find({ category: category })
        .select()
        .exec()
        .then((allBook) => {
            const response = {
                "Number of book": allBook.length,
                Books: allBook.map((book) => {
                    return {
                        id: book._id,
                        name: book.name,
                        author: book.author,
                        edition: book.edition,
                        total: book.total,
                        available: book.available,
                        category: book.category,
                        students: book.students
                    };
                }),
            };
            res.status(200).json(response);
        })
        .catch((err) => {
            console.log(err);
        });
});


//Add new Book
router.post("/", (req, res, next) => {
    const { name, author, edition = '-', category, total } = req.body;
    const singleBook = {
        name: name,
        author: author,
        edition: edition + 'e',
        total: total,
        category: category,
        available: total
    };
    console.log(singleBook);
    //book data object
    const book = new Book({
        _id: new mongoose.Types.ObjectId(),
        name: name,
        author: author,
        edition: edition + 'e',
        total: total,
        category: category,
        available: total
    });

    //insert query
    book
        .save()
        .then((result) => {
            console.log("Success\n" + result);
            res.status(200).json({
                message: "book info inserted"
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

//update single book
router.patch("/:bookId", (req, res, next) => {
    const id = req.params.bookId;
    Book.updateOne({ _id: id }, { $set: req.body })
        .exec()
        .then((result) => {
            console.log("Update successfully");
            res.status(200).json({
                message: "book info updated"
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

//borrow book to student
router.patch("/borrow/:bookId", (req, res, next) => {
    const id = req.params.bookId;
    const studentId = req.body.studentId;
    Book.updateOne({ _id: id }, { $push: { students: studentId } })
        .exec()
        .then((result) => {
            console.log("Update successfully");
            res.status(200).json({
                message: "borrow book , student"
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});
//borrow book remove from  student
router.patch("/borrowreturn/:bookId", (req, res, next) => {
    const id = req.params.bookId;
    const studentId = req.body.studentId;
    Book.updateOne({ _id: id }, { $pull: { students: studentId } })
        .exec()
        .then((result) => {
            console.log("Update successfully");
            res.status(200).json({
                message: "remove student"
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});
//Delete single book
router.delete("/:bookId", (req, res, next) => {
    const id = req.params.bookId;
    console.log(id)
    Book.deleteOne({ _id: id })
        .exec()
        .then((result) => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch((err) => {
            console.log("Error" + err);
            res.status(500).json(err);
        });
});

module.exports = router;