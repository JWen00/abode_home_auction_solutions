"""add blurb and avatar to user table

Revision ID: 2eb333c03b34
Revises: e7de715aca54
Create Date: 2020-11-01 19:05:48.084429

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2eb333c03b34'
down_revision = 'e7de715aca54'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('user', sa.Column('avatar_data', sa.LargeBinary(), nullable=True))
    op.add_column('user', sa.Column('avatar_image_type', sa.String(), nullable=True))
    op.add_column('user', sa.Column('blurb', sa.Text(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('user', 'blurb')
    op.drop_column('user', 'avatar_image_type')
    op.drop_column('user', 'avatar_data')
    # ### end Alembic commands ###
