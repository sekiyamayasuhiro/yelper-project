"""empty message

Revision ID: e6c523c93dd6
Revises: 64c157bee8a5
Create Date: 2024-08-25 03:17:12.213037

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e6c523c93dd6'
down_revision = '64c157bee8a5'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('created_at', sa.TIMESTAMP(), nullable=True))
        batch_op.add_column(sa.Column('updated_at', sa.TIMESTAMP(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.drop_column('updated_at')
        batch_op.drop_column('created_at')

    # ### end Alembic commands ###
