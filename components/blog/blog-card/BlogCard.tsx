import React from "react";
import { Box, Text, Tooltip } from "@chakra-ui/react";
import { BlogInterface } from "@/model/Blog";
import classes from "./BlogCard.module.scss";

const BlogCard = ({ blog, showDetail }: { blog: BlogInterface; showDetail: (blog: BlogInterface) => void }) => {
  return (
    <Box
      borderRadius="lg"
      backgroundColor="gray.200"
      cursor="pointer"
      boxShadow="xl"
      className={classes["blog"]}
      onClick={() => showDetail(blog)}>
      <Box overflow="hidden">
        <Box
          height="300px"
          backgroundImage={`url(${blog.imageUrl})`}
          backgroundPosition="center"
          backgroundSize="cover"
          backgroundRepeat="no-repeat"
          borderTopRadius="lg"
          className={classes["blog__image"]}
        />
      </Box>
      <Tooltip label={blog.name} aria-label="A tooltip">
        <Text m="2" noOfLines={2} fontSize="lg" fontWeight="600" className={classes["blog__title"]}>
          {blog.name}
        </Text>
      </Tooltip>
    </Box>
  );
};

export default BlogCard;
