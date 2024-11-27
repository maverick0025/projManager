package com.maverick.projectManagementSystem.service;

import com.maverick.projectManagementSystem.model.Comment;
import com.maverick.projectManagementSystem.model.Issue;
import com.maverick.projectManagementSystem.model.User;
import com.maverick.projectManagementSystem.repository.CommentRepository;
import com.maverick.projectManagementSystem.repository.IssueRepository;
import com.maverick.projectManagementSystem.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class CommentServiceImpl implements CommentService{

    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private IssueRepository issueRepository;
    @Autowired
    private UserRepository userRepository;

    @Override
    public Comment createComment(Long issueId, Long userId, String content) throws Exception {
        Optional<Issue> issueOptional = issueRepository.findById(issueId);
        Optional<User> userOptional = userRepository.findById(userId);

        if(issueOptional.isEmpty()){
            throw new Exception("Issue not found");
        }
        if(userOptional.isEmpty()){
            throw new Exception("User not found");
        }

        Issue  issue = issueOptional.get();
        User user = userOptional.get();
        Comment comment = new Comment();

        comment.setIssue(issue);
        comment.setUser(user);
        comment.setCreatedDateTime(LocalDateTime.now());
        comment.setContent(content);

        Comment newComment = commentRepository.save(comment);
        issue.getComments().add(newComment);

        return newComment;
    }

    @Override
    public void deleteComment(Long commentId, Long userId) throws Exception{
        Optional<Comment> commentOptional = commentRepository.findById(commentId);
        Optional<User> userOptional = userRepository.findById(userId);

        if(commentOptional.isEmpty()){
            throw new Exception("Comment not found");
        }
        if(userOptional.isEmpty()){
            throw new Exception("User not found");
        }

        Comment comment = commentOptional.get();
        User user = userOptional.get();

        if(comment.getUser().equals(user)){
            commentRepository.delete(comment);

        }else{
            throw new Exception("Current user isn't authorized to delete the comment");
        }

        return;
    }

    @Override
    public List<Comment> findCommentByIssueId(Long issueId) {
        return commentRepository.findByIssueId(issueId);
    }
}
