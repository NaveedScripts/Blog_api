const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create Post
exports.createPost = async (req, res) => {
  const { title, content } = req.body;

  try {
    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorId: req.user.id,
      },
    });

    res.status(201).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating post' });
  }
};

// Get All Posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: { author: { select: { id: true, email: true } } },
      orderBy: { createdAt: 'desc' },
    });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching posts' });
  }
};

// Get Single Post
exports.getPostById = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await prisma.post.findUnique({
      where: { id: Number(id) },
      include: { author: { select: { id: true, email: true } } },
    });

    if (!post) return res.status(404).json({ message: 'Post not found' });

    res.json(post);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching post' });
  }
};

// Update Post
exports.updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    const post = await prisma.post.findUnique({ where: { id: Number(id) } });

    if (!post) return res.status(404).json({ message: 'Post not found' });
    if (post.authorId !== req.user.id)
      return res.status(403).json({ message: 'Not authorized to update this post' });

    const updatedPost = await prisma.post.update({
      where: { id: Number(id) },
      data: { title, content },
    });

    res.json(updatedPost);
  } catch (err) {
    res.status(500).json({ message: 'Error updating post' });
  }
};

// Delete Post
exports.deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await prisma.post.findUnique({ where: { id: Number(id) } });

    if (!post) return res.status(404).json({ message: 'Post not found' });
    if (post.authorId !== req.user.id)
      return res.status(403).json({ message: 'Not authorized to delete this post' });

    await prisma.post.delete({ where: { id: Number(id) } });

    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting post' });
  }
};
