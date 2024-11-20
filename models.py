from dataclasses import dataclass
from datetime import datetime
from typing import Optional


@dataclass
class Post:
    post_id: int
    title: str
    content: str
    user_id: int
    author: Optional[str] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    views: int = 0
    category: Optional[str] = None