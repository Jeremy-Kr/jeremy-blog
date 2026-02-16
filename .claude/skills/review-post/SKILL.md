---
name: review-post
description: This skill should be used when the user asks to "review a post", "check my post", "포스트 리뷰", or "글 검토". Reviews an MDX blog post for content quality, technical correctness, and MDX validity.
---

# Blog Post Review

## Process

1. Read the specified MDX file (or the most recently modified one in `content/blog/`)

2. **Frontmatter validation**
   - All required fields present: title, description, date, tags
   - date is valid YYYY-MM-DD format
   - tags is a non-empty string array
   - description is concise (under 200 characters)

3. **MDX syntax validation**
   - Attempt to parse with `compileMDX` mentally — flag unclosed tags, invalid JSX
   - All code blocks have language identifiers
   - No raw HTML that could break RSC

4. **Content quality review**
   - Title is clear and descriptive
   - Logical structure (introduction → body → conclusion)
   - Spelling and grammar check (Korean)
   - Code examples are correct and runnable
   - Images have alt text
   - Links are properly formatted

5. **Style consistency**
   - Consistent heading hierarchy (no skipping levels)
   - Appropriate post length
   - Tags match existing conventions

## Output Format

Report findings as:
- **Errors**: Must fix before publishing (broken syntax, missing fields)
- **Warnings**: Should fix (style issues, missing alt text)
- **Suggestions**: Optional improvements (better title, restructuring)
