"""create contact table

Revision ID: d6fdeb505520
Revises: 
Create Date: 2025-09-03 13:38:32.964135

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from datetime import datetime
from sqlalchemy.sql import func


# revision identifiers, used by Alembic.
revision: str = 'd6fdeb505520'
down_revision: Union[str, Sequence[str], None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        'contacts',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('first_name', sa.String, nullable=False),
        sa.Column('last_name', sa.String, nullable=False),
        sa.Column('email', sa.String, nullable=False, unique=True),
        sa.Column('created_at', sa.DateTime(timezone=True), default=func.now())
    )

def downgrade() -> None:
    op.drop_table('contacts')
